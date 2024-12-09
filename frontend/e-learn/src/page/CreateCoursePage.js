import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Header from "../component/Header";
import Footer from "../component/Footer";

const CreateCoursePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    // price: "",
    image: "",
  });
  const [createdCourse, setCreatedCourse] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = "dq12srhfg";
  const UPLOAD_PRESET = "your_upload_preset"; // Replace with your upload preset
  const token = Cookies.get("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        uploadFormData
      );
      setFormData({ ...formData, image: response.data.secure_url });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload a thumbnail image.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/create-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const data = await response.json();
      console.log("Course Created:", data);
      setCreatedCourse(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <><Header /><div className="container mx-auto p-8">
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
            required />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            rows="4"
            required />
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required />
        </div>
        <div>
          <label className="block font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required />
        </div>
        <div>
          <label className="block font-medium">Thumbnail</label>
          <input type="file" onChange={handleFileChange} className="mb-2" />
          <button
            type="button"
            onClick={handleUpload}
            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Course
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 border rounded bg-red-100 text-red-700">
          <p>Error: {error}</p>
        </div>
      )}

      {createdCourse && (
        <div className="mt-8 p-4 border rounded shadow-lg">
          <h2 className="text-2xl font-bold">Course Created Successfully!</h2>
          <p className="mt-2">
            <strong>Title:</strong> {createdCourse.title}
          </p>
          <img
            src={createdCourse.image}
            alt={createdCourse.title}
            className="mt-4 w-full max-w-md rounded-lg" />
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default CreateCoursePage;
