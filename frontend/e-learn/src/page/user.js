import React from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200">
      {/* Top SVG Wave */}
      <svg
        className="absolute top-0 left-0 w-full h-64"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#10b981"
          fillOpacity="0.7"
          d="M0,192L30,186.7C60,181,120,171,180,160C240,149,300,139,360,128C420,117,480,107,540,122.7C600,139,660,181,720,192C780,203,840,181,900,160C960,139,1020,117,1080,106.7C1140,96,1200,96,1260,101.3C1320,107,1380,117,1410,122.7L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>

      {/* Header */}
      <h1 className="relative z-10 text-4xl font-bold text-gray-800 mb-6">
        User - Create Lecture
      </h1>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-green-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 2c4.411 0 8 3.589 8 8s-3.589 8-8 8-8-3.589-8-8 3.589-8 8-8zm-2 5H8v2h2v6h2v-6h2v-2h-2V7h-2v2z" />
          </svg>
        </div>

        <p className="text-gray-600 text-lg mb-4 text-center">
          Manage and create lectures for your courses.
        </p>

        {/* Navigation Button */}
        <div className="flex justify-center">
          <button
            className="px-6 py-3 bg-green-500 text-white font-medium rounded-md shadow hover:bg-green-600 focus:outline-none"
            onClick={() => navigate("/course")}
          >
            Go to Course List
          </button>
        </div>
      </div>

      {/* Bottom SVG Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-64"
        viewBox="0 0 1440 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#10b981"
          fillOpacity="0.7"
          d="M0,128L30,133.3C60,139,120,149,180,149.3C240,149,300,139,360,122.7C420,107,480,85,540,96C600,107,660,149,720,181.3C780,213,840,235,900,224C960,213,1020,171,1080,154.7C1140,139,1200,149,1260,165.3C1320,181,1380,203,1410,213.3L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default User;
