import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission
    console.log("Form data:", formData);
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Sends the form data as a JSON payload
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login successful:", data?.token);
        if (data?.token) {
          console.log("Login successful:", data.token);
          // Set the token in a cookie
          document.cookie = `token=${data.token}; path=/; max-age=${24 * 60 * 60}`; // Cookie valid for 1 day
          window.location.reload(); // Reload the page to reflect the login status
        } else {
          console.error("Login failed: No token received");
        }
        
        // Add success handling logic here
      })
      .catch((error) => {
        console.error("Error during login:", error);
        // Add error handling logic here
      });
    };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login Page
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:underline focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
