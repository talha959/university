import React, { useState, useEffect } from "react";
import {
  GetCountries,
  GetState,
} from "react-country-state-city";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });

  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);

  // Fetch country and region data on component mount
  useEffect(() => {
    GetCountries().then((result) => setCountriesList(result));
  }, []);

  // Handle change in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle country selection and fetch states for selected country
  const handleCountryChange = (e) => {
    const countryName = e.target.value; // Get the selected country name
    setFormData({ ...formData, country: countryName, state: "" });
  
    // Find the selected country's ID to fetch states
    const selectedCountry = countriesList.find(
      (country) => country.name === countryName
    );
  
    if (selectedCountry) {
      GetState(selectedCountry.id).then((result) => setStatesList(result));
    }
  };
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registration Page
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

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

          <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">
    Country
  </label>
  <select
    name="country"
    value={formData.country}
    onChange={handleCountryChange}
    className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    required
  >
    <option value="">Select Country</option>
    {countriesList.map((country) => (
      <option key={country.id} value={country.name}>
        {country.name}
      </option>
    ))}
  </select>
</div>


          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600 text-center">
          Have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
