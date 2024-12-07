import React, { useState } from "react";

const sampleCourseData = {
  title: "Introduction to Programming",
  description: "Learn the basics of programming in this course",
  category: "Programming",
  createdBy: "AdminUserId",
  duration: "10 hours",
  price: 49.99,
  image: "https://i.ibb.co/bLgqjmd/Screenshot-3.png",
};

const CreateCoursePage = () => {
  const [formData, setFormData] = useState(sampleCourseData);
  const [createdCourse, setCreatedCourse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would make an API call to save the course
    console.log("Course Created:", formData);
    setCreatedCourse(formData);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Created By</label>
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Course
        </button>
      </form>

      {createdCourse && (
        <div className="mt-8 p-4 border rounded shadow-lg">
          <h2 className="text-2xl font-bold">Course Created Successfully!</h2>
          <p className="mt-2">
            <strong>Title:</strong> {createdCourse.title}
          </p>
          <p>
            <strong>Description:</strong> {createdCourse.description}
          </p>
          <p>
            <strong>Category:</strong> {createdCourse.category}
          </p>
          <p>
            <strong>Duration:</strong> {createdCourse.duration}
          </p>
          <p>
            <strong>Price:</strong> ${createdCourse.price}
          </p>
          <img
            src={createdCourse.image}
            alt={createdCourse.title}
            className="mt-4 w-full max-w-md rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CreateCoursePage;
