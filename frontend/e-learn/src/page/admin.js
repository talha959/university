import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      {/* SVG Header Graphic */}
      <svg
        className="absolute top-0 left-0 w-full h-64"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#4f46e5"
          fillOpacity="0.7"
          d="M0,64L30,85.3C60,107,120,149,180,154.7C240,160,300,128,360,133.3C420,139,480,181,540,197.3C600,213,660,203,720,186.7C780,171,840,149,900,133.3C960,117,1020,107,1080,106.7C1140,107,1200,117,1260,138.7C1320,160,1380,192,1410,208L1440,224L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>

      {/* Header */}
      <h1 className="relative z-10 text-4xl font-bold text-gray-800 mb-6">
        Admin - Create Lecture
      </h1>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        {/* SVG Icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-blue-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1 17.93C7.15 19.43 4 16.281 4 12h2c0 3.309 2.691 6 6 6v2.93zM12 4c3.859 0 7 3.141 7 7h-2c0-2.761-2.239-5-5-5V4zm0 8c-.553 0-1 .447-1 1v4h2v-4c0-.553-.447-1-1-1zm0-6c-.553 0-1 .447-1 1v2h2V7c0-.553-.447-1-1-1z" />
          </svg>
        </div>

        <p className="text-gray-600 text-lg mb-4 text-center">
          Manage and create lectures for your courses.
        </p>

        {/* Navigation Button */}
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
