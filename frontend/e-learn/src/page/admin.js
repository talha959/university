import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Admin - Create Lecture
      </h1>

      {/* Content */}
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <p className="text-gray-600 text-lg mb-4 text-center">
          Manage and create lectures for your courses.
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <button
            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none"
            onClick={() => navigate("/AdminCoursesListPage")}
          >
            Go to Course List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
