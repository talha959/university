import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ role, children }) => {
  const [userRole, setUserRole] = React.useState(null); // Role fetched from the server
  const token = Cookies.get("token"); // Token from cookies
  const [loading, setLoading] = React.useState(true); // Loading state

  React.useEffect(() => {
    if (token) {
      // Fetch the role from the server
      fetch("http://localhost:4000/api/role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data.role); // Set fetched role
          setLoading(false); // Stop loading
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
          setLoading(false); // Stop loading in case of error
        });
    } else {
      setLoading(false); // No token means no need to fetch
    }
  }, [token]);

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }
 else if (token && userRole && userRole !== role) {
    return <Navigate to={`/${userRole}`} />;
  }

  // Show a loading indicator while fetching role
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect based on role mismatch

  // Allow access if role matches
  return children;
};

export default ProtectedRoute;
