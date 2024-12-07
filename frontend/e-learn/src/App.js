import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const CLOUD_NAME = "dq12srhfg";
  const UPLOAD_PRESET = "your_upload_preset"; // Replace with your upload preset

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your upload preset");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dq12srhfg/upload`,
        formData
      );
      setUploadedUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Cloudinary File Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadedUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded File URL:</h3>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
