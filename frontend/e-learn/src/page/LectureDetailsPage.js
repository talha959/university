import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // to get the lecture ID from the URL

const lectureData = {
  "1": {
    title: "Introduction to Programming",
    description: "Learn the basics of programming in this course",
    category: "Programming",
    createdBy: "AdminUserId",
    duration: "10 hours",
    price: 49.99,
    image: "https://i.ibb.co/bLgqjmd/Screenshot-3.png",
  },
  // You can add more lecture objects for different IDs
};

const LectureDetailsPage = () => {
  const { id } = useParams(); // Get the lecture ID from the URL
  const [lecture, setLecture] = useState(null);

  useEffect(() => {
    // Fetch the lecture data based on ID (you could replace this with an API call)
    const fetchedLecture = lectureData[id];
    setLecture(fetchedLecture);
  }, [id]);

  if (!lecture) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row items-center">
        <img
          src={lecture.image}
          alt={lecture.title}
          className="w-full lg:w-1/2 h-64 object-cover rounded-lg"
        />
        <div className="lg:ml-8 mt-6 lg:mt-0">
          <h1 className="text-3xl font-bold">{lecture.title}</h1>
          <p className="text-gray-600 mt-2">{lecture.description}</p>
          <div className="mt-4">
            <p className="text-lg font-medium">Category: {lecture.category}</p>
            <p className="text-lg font-medium">Duration: {lecture.duration}</p>
            <p className="text-lg font-medium">Price: ${lecture.price}</p>
          </div>
          <div className="mt-6">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetailsPage;
