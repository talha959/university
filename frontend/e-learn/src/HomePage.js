import React from 'react';
import Cookies from "js-cookie";

const HomePage = () => {

  const handleClick = () => {
    const token = Cookies.get('token');
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    if(decodedToken){
      if(decodedToken.existingUser.role === 'admin'){
        window.location.href = "/admin";}
        if(decodedToken.existingUser.role === 'user'){
          window.location.href = "/user";}
    }else{
      window.location.href = "/login";
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <section className="bg-blue-600 w-full text-white py-32 flex justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        <div className="text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate__animated animate__fadeIn">Welcome to E-Learn Platform</h1>
          <p className="text-lg sm:text-xl mb-6 animate__animated animate__fadeIn animate__delay-1s">Learn anytime, anywhere with interactive courses and quizzes.</p>
          <button className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-full text-lg animate__animated animate__fadeIn animate__delay-2s" 
          onClick={handleClick}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Default Content Section */}
      <section className="w-full py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Explore Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold mb-4">Interactive Courses</h3>
            <p>Learn coding, design, and more with interactive lessons.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold mb-4">Quizzes & Tests</h3>
            <p>Test your skills with quizzes and track your progress.</p>
          </div>
          <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold mb-4">Certificates</h3>
            <p>Get certified for the skills you've mastered.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
