import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router for routing

const lectures = [
    {
        "_id": "6752acd5c1d7839282d98d9d",
        "title": "Introduction to QA",
        "description": "Learn the basics of QA in this course",
        "category": "QA",
        "createdBy": "AdminUserId",
        "duration": "10 hours",
        "price": 0,
        "image": "https://i.ibb.co/bLgqjmd/Screenshot-3.png",
        "createdAt": "2024-12-06T07:50:45.244Z",
        "__v": 0
    },
    {
        "_id": "67530fce3ff6673bc0af3d75",
        "title": "Introduction to Programming",
        "description": "Learn the basics of programming in this course",
        "category": "Programming",
        "createdBy": "AdminUserId",
        "duration": "10 hours",
        "price": 49.99,
        "image": "https://i.ibb.co/bLgqjmd/Screenshot-3.png",
        "createdAt": "2024-12-06T14:53:02.969Z",
        "__v": 0
    },
    {
        "_id": "67532a2374bfd1ffd47de6db",
        "title": "Introduction to Rust",
        "description": "Learn the basics of Rust in this course",
        "category": "Programming",
        "createdBy": "Talha",
        "duration": "10 hours",
        "price": 0,
        "image": "https://i.ibb.co/bLgqjmd/Screenshot-3.png",
        "createdAt": "2024-12-06T16:45:23.514Z",
        "__v": 0
    }
  // Add more lecture objects here if needed
];

const LectureListPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Available Lectures</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {lectures.map((lecture) => (
          <div key={lecture.id} className="border rounded-lg p-4 bg-white shadow-md">
            <img src={lecture.image} alt={lecture.title} className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{lecture.title}</h2>
              <p className="text-gray-600">{lecture.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-green-600 font-semibold">${lecture.price}</span>
                <Link
                  to={`/LectureDetailsPage/${lecture._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureListPage;
