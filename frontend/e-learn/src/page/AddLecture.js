import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../component/Header";
import Footer from "../component/Footer";

const AddLecturePage = () => {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [lectureDetails, setLectureDetails] = useState({
    title: "",
    description: "",
    video: "",
  });
  const { id } = useParams(); // Get ID from URL params

  const CLOUD_NAME = "dq12srhfg";
  const UPLOAD_PRESET = "your_upload_preset"; // Replace with your Cloudinary upload preset

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLectureDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        formData
      );
      const videoUrl = response.data.secure_url;
      setUploadedUrl(videoUrl);
      setLectureDetails((prevDetails) => ({
        ...prevDetails,
        video: videoUrl,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  const handleSubmit = async () => {
    if (!lectureDetails.title || !lectureDetails.description || !uploadedUrl) {
      alert("Please fill in all fields and upload the video.");
      return;
    }
    const token=Cookies.get("token");
    try {
      const response = await axios.post(
        `http://localhost:4000/api/add-lecture/${id}`,
        {
          title: lectureDetails.title,
          description: lectureDetails.description,
          video: lectureDetails.video,
        },
        {
          headers: {
        Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Lecture added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error adding lecture:", error);
      alert("Failed to add lecture.");
    }
  };

  return (
    <><Header /><div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Lecture</h1>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={lectureDetails.title}
          onChange={handleInputChange}
          className="border rounded w-full px-4 py-2"
          placeholder="Enter lecture title" />
      </div>
      <div className="mb-4">
        <label
          className="block text-lg font-semibold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={lectureDetails.description}
          onChange={handleInputChange}
          className="border rounded w-full px-4 py-2"
          placeholder="Enter lecture description" />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2" htmlFor="file">
          Upload Video
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="block" />
        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload Video
        </button>
        {uploadedUrl && (
          <div className="mt-4">
            <h3>Uploaded Video URL:</h3>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {uploadedUrl}
            </a>
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-6 py-2 rounded"
      >
        Add Lecture
      </button>
    </div><Footer /></>
  );
};

export default AddLecturePage;
