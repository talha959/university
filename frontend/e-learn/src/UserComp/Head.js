import React from "react";

const Head = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">My Website</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/userInfo" className="hover:text-gray-200">User-Info</a></li>
            <li><a href="/course" className="hover:text-gray-200">Course-List</a></li>
            <li><a href="/LectureNotes" className="hover:text-gray-200">Lecture Notes</a></li>
            {/* <li><a href="#contact" className="hover:text-gray-200">Contact</a></li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Head;
