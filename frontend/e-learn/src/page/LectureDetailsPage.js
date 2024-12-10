import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const LectureDetailsPage = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/get-lecture/${id}`);
        setLectures(response.data.lectures); // Assuming API returns an object with a `lectures` array
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
          setError("No lecture found");
        } else {
          setError("Failed to fetch lectures");
        }
        setLoading(false);
      }
    };

    fetchLectures();
  }, [id]);

  const handleDelete = async (lectureId) => {
    if (window.confirm("Are you sure you want to delete this lecture?")) {
      try {
        await axios.delete(`http://localhost:4000/api/delete-lecture/${lectureId}`);
        setLectures((prevLectures) => prevLectures.filter((lecture) => lecture._id !== lectureId));
        alert("Lecture deleted successfully");
      } catch (err) {
        console.error(err);
        alert("Failed to delete lecture");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (lectures.length === 0) {
    return <div>No lectures found</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Lectures</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {lectures.map((lecture) => (
          <div
            key={lecture._id}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-6"
          >
            <video
              controls
              src={lecture.video}
              className="w-full h-64 object-cover rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold">{lecture.title}</h2>
              <p className="text-gray-600 mt-2">{lecture.description}</p>
              <div className="mt-4">
                <p className="text-lg font-medium">Course ID: {lecture.course}</p>
                <p className="text-sm text-gray-500">
                  Created At: {new Date(lecture.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-6 items-center">
                <button
                  onClick={() => handleDelete(lecture._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureDetailsPage;
