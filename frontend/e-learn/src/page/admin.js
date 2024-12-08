import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";
import CreateCoursePage from "./CreateCoursePage";

const Admin = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Data for dashboard cards
  const dashboardData = [
    { title: "Total Users", value: 120 },
    { title: "Projects", value: 45 },
    { title: "Revenue", value: "$15,000" },
    { title: "Tasks Completed", value: 85 },
  ];

  // Navigation handler
  const handleNavigation = (page) => {
    setActivePage(page);
  };

  return (
    // <Router>
      <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f9f9f9" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "250px",
            backgroundColor: "grey",
            color: "#fff",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            My Dashboard
          </Typography>
          <Button
            component={Link}
            to="/"
            onClick={() => handleNavigation("dashboard")}
            sx={{
              color: activePage === "dashboard" ? "#00bcd4" : "#fff",
              textAlign: "left",
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/CreateCoursePage"
            onClick={() => handleNavigation("analytics")}
            sx={{
              color: activePage === "analytics" ? "#00bcd4" : "#fff",
              textAlign: "left",
            }}
          >
            Analytics
          </Button>
          <Button
            component={Link}
            to="/settings"
            onClick={() => handleNavigation("settings")}
            sx={{
              color: activePage === "settings" ? "#00bcd4" : "#fff",
              textAlign: "left",
            }}
          >
            Settings
          </Button>
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, padding: "20px" }}>
          <Routes>
            {/* Dashboard Page */}
            <Route
              path="/"
              element={
                <><div className=" flex flex-row gap-5">
                      <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/willingness-to-learn.png" alt="willingness-to-learn" />
                      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                          E-learning Admin Dashboard
                      </Typography>
                  </div>
                <div className=" flex justify-center items-center" >

                  <img className=" w-1/5 h-1/5 border-3  " src="/Quote.jpg" />
                </div>
                  </>
              }
            />

            {/* Analytics Page */}
            {/* <Route
              path="/analytics"
              element={
                <Box>
                  <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                    Analytics
                  </Typography>
                  <Typography>Coming Soon: Detailed analytics for your data.</Typography>
                </Box>
              }
            /> */}

            <Route path='/CreateCoursePage' element={<CreateCoursePage/>}/>

            {/* Settings Page */}
            {/* <Route
              path="/settings"
              element={
                <Box>
                  <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                    Settings
                  </Typography>
                  <Typography>Manage your preferences here.</Typography>
                </Box>
              }
            /> */}
          </Routes>
        </Box>
      </Box>
    // </Router>
  );
};

export default Admin;
