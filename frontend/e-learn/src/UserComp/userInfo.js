import React, { use } from "react";
import Cookies from "js-cookie";
import Head from "./Head";
import Footer from "./Footer";
const UserInfo = ({  }) => {
  const [users, setUsers] = React.useState(null);
  const [tokens, setTokens] = React.useState(null);
  React.useEffect(() => {
    
    const getAndDecodeToken = () => {
      const token = Cookies.get("token");
      setTokens(token);
      if (!token) {
        console.error("No token found in cookies.");
        return null;
      }
    
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(atob(payload));
        console.log("Decoded Token:", decoded?.existingUser?._id);
        fetch(`http://localhost:4000/api/info/${decoded?.existingUser?._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUsers(data);
            console.log("User data:", data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          }
        )
        return decoded;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    };
    getAndDecodeToken();
  }, [])
  
    // const user={
    //     "_id": "675296223270461f513c6505",
    //     "name": "talha",
    //     "email": "i.talha.rajpot@gmail.com",
    //     "country": "Pakistan",
    //     "role": "admin",
    //     "createdAt": "2024-12-06T06:13:54.596Z",
    //     "updatedAt": "2024-12-06T06:13:54.596Z",
    //     "__v": 0
    // }
  return (
    <><Head /><div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          User Information
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-gray-600">{users?.name}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-gray-600">{users?.email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <p className="mt-1 text-gray-600">{users?.country}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <p className="mt-1 text-gray-600">{users?.role}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Created At</label>
          <p className="mt-1 text-gray-600">{new Date(users?.createdAt).toLocaleString()}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Updated At</label>
          <p className="mt-1 text-gray-600">{new Date(users?.updatedAt).toLocaleString()}</p>
        </div>

        {/* <div className="mt-6 text-center">
          <a
            href="/edit-profile"
            className="text-blue-500 hover:underline focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Edit Profile
          </a>
          <a></a>
        </div> */}
        <button
        // className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={async () => {
            if (!tokens) {
              alert('User not logged in');
              return;
            }
            try {
              const response = await fetch('http://localhost:4000/api/logout', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${tokens}`,
                  'Content-Type': 'application/json',
                },
              });
              if (response.ok) {
                Cookies.remove('token');
                window.location.href = '/login';
              } else {
                console.error('Logout failed');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          } }
          className="ml-4 text-red-500 hover:underline focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default UserInfo;
