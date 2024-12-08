import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AdminCoursesListPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token=Cookies.get("token");
  const fetchCourses = async () => {
    try {
      setLoading(true);
    const response = await axios.get("http://localhost:4000/api/getCourse", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      setCourses(response.data.course); // Assuming the data structure has a "course" key
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.message || "Failed to fetch courses.");
    } finally {
      setLoading(false);
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="border rounded-lg p-4 shadow-lg">
              <img
                src={course.image}
                alt={course.title}
                className="rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
              <p className="mt-2">
                <strong>Category:</strong> {course.category}
              </p>
              <p>
                <strong>Duration:</strong> {course.duration}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(course.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No courses available.</p>
      )}
    </div>
  );
};

export default AdminCoursesListPage;
