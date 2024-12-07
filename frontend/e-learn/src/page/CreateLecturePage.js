import React, { useState } from "react";

const sampleLectureData = {
  title: "basics of python",
  description: "Introduction to python",
  video: "https://youtu.be/0rbSuB890X0?si=hFYeFFv3IOY3zn8j",
};

const CreateLecturePage = () => {
  const [formData, setFormData] = useState(sampleLectureData);
  const [createdLecture, setCreatedLecture] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would make an API call to save the lecture
    console.log("Lecture Created:", formData);
    setCreatedLecture(formData);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create Lecture</h1>
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
          <label className="block font-medium">Video URL</label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Lecture
        </button>
      </form>

      {createdLecture && (
        <div className="mt-8 p-4 border rounded shadow-lg">
          <h2 className="text-2xl font-bold">Lecture Created Successfully!</h2>
          <p className="mt-2">
            <strong>Title:</strong> {createdLecture.title}
          </p>
          <p>
            <strong>Description:</strong> {createdLecture.description}
          </p>
          <p>
            <strong>Video URL:</strong>{" "}
            <a
              href={createdLecture.video}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Watch Video
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateLecturePage;
