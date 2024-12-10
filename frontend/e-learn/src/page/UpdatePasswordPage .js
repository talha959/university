import React, { useState } from "react";
import Cookies from "js-cookie";
const UpdatePasswordPage = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
      const response = await fetch("http://localhost:4000/api/updatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,	
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password.");
      }

      const result = await response.json();
      console.log(result);
      if(decodedToken.existingUser.role === 'admin'){
        window.location.href = "/admin";}
        if(decodedToken.existingUser.role === 'user'){
          window.location.href = "/user";}
      if (result.success) {
        setSuccess(true);
        setError(null);

        
      } else {
        // setError(result.message || "Something went wrong.");
        setSuccess(false);
      }
    } catch (error) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your old password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Update Password
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">
            Error: {error}
          </p>
        )}

        {success && (
          <p className="mt-4 text-sm text-green-600 text-center">
            Password updated successfully!
          </p>
        )}

        <p className="mt-4 text-sm text-gray-600 text-center">
          <a
            href="/profile"
            className="text-blue-500 hover:underline focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Back to Profile
          </a>
        </p>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
