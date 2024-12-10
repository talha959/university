import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Head from "./Head";
import Footer from "./Footer";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage errors
  const token = Cookies.get("token"); // Assuming token is stored in cookies

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/api/get-all-courses", {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the header
          },
        });
        setCourses(response.data.courses); // Assuming the API returns data under `courses`
      } catch (err) {
        setError(err.message || "An error occurred while fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  return (
    <>
      <Head />
      <div className="container mx-auto p-8 ">
        <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

        {loading ? (
          <p className="text-center">Loading courses...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <><div key={course._id} className="border rounded-lg p-4 shadow-lg">
                    <img
                        src={course.image}
                        alt={course.title}
                        className="rounded-lg mb-4 w-full h-48 object-cover" />
                    <h2 className="text-xl font-bold">{course.title}</h2>
                    <p className="text-gray-600">{course.description}</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                    onClick={() => (window.location.href = `/lecture/${course._id}`)}
                >
                        View Lectures
                    </button>
                </div>
                    </>
            ))}
          </div>
        ) : (
          <p className="text-center">No courses available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Courses;
