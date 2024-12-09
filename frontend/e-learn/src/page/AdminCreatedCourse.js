import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../component/Header";
import Footer from "../component/Footer";

const AdminCoursesListPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({});
  const [file, setFile] = useState(null);
  const CLOUD_NAME = "dq12srhfg";
  const UPLOAD_PRESET = "your_upload_preset"; // Replace with your actual Cloudinary upload preset
  const token = Cookies.get("token");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/api/getCourse", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data.course); // Assuming the data structure has a "course" key
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.message || "Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:4000/api/delete-course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete the course. Please try again.");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
      return null;
    }
  };

  const updateCourse = async () => {
    try {
      const imageUrl = file ? await handleUpload() : editingCourse.image;

      const updatedData = {
        ...updatedCourse,
        image: imageUrl,
      };

      await axios.put(
        `http://localhost:4000/api/update-course/${editingCourse._id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingCourse(null);
      fetchCourses(); // Refresh course list
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update the course. Please try again.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center">Loading courses...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="border rounded-lg p-4 shadow-lg">
                <img
                  src={course.image}
                  alt={course.title}
                  className="rounded-lg mb-4 w-full h-48 object-cover"
                />
                <h2 className="text-xl font-bold">{course.title}</h2>
                <p className="text-gray-600">{course.description}</p>
                <div className="flex flex-wrap justify-between gap-2 mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                    onClick={() => setEditingCourse(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                    onClick={() => (window.location.href = `/LectureDetailsPage/${course._id}`)}
                  >
                    View Lectures
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                    onClick={() =>
                      (window.location.href = `/AddLecturePage/${course._id}`)
                    }
                  >
                    Create Lectures
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                    onClick={() => deleteCourse(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No courses available.</p>
        )}
      </div>
      {editingCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Course</h2>
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              value={updatedCourse.title || editingCourse.title}
              onChange={(e) =>
                setUpdatedCourse({ ...updatedCourse, title: e.target.value })
              }
            />
            <label className="block mb-2">Description:</label>
            <textarea
              className="w-full p-2 mb-4 border rounded"
              value={updatedCourse.description || editingCourse.description}
              onChange={(e) =>
                setUpdatedCourse({
                  ...updatedCourse,
                  description: e.target.value,
                })
              }
            ></textarea>
            <label className="block mb-2">Category:</label>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              value={updatedCourse.category || editingCourse.category}
              onChange={(e) =>
                setUpdatedCourse({ ...updatedCourse, category: e.target.value })
              }
            />
            <label className="block mb-2">Duration:</label>
            <input
              type="text"
              className="w-full p-2 mb-4 border rounded"
              value={updatedCourse.duration || editingCourse.duration}
              onChange={(e) =>
                setUpdatedCourse({ ...updatedCourse, duration: e.target.value })
              }
            />
            <label className="block mb-2">Image:</label>
            <input type="file" className="w-full p-2 mb-4 border rounded" onChange={handleFileChange} />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={updateCourse}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AdminCoursesListPage;
