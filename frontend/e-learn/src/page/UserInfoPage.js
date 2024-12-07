import React from "react";

const UserInfoPage = ({  }) => {
    const user={
        "_id": "675296223270461f513c6505",
        "name": "talha",
        "email": "i.talha.rajpot@gmail.com",
        "country": "Pakistan",
        "role": "admin",
        "createdAt": "2024-12-06T06:13:54.596Z",
        "updatedAt": "2024-12-06T06:13:54.596Z",
        "__v": 0
    }
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Information
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-gray-600">{user.name}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-gray-600">{user.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <p className="mt-1 text-gray-600">{user.country}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="mt-1 text-gray-600">{user.role}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Created At</label>
          <p className="mt-1 text-gray-600">{new Date(user.createdAt).toLocaleString()}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Updated At</label>
          <p className="mt-1 text-gray-600">{new Date(user.updatedAt).toLocaleString()}</p>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/edit-profile"
            className="text-blue-500 hover:underline focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
