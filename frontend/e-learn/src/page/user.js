import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, Grid } from "@mui/material";

const User = () => {
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
    <Router>
      <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f9f9f9" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "250px",
            backgroundColor: "#282c34",
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
            to="/analytics"
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
                <Box>
                  <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                    Dashboard
                  </Typography>
                  <Grid container spacing={3}>
                    {dashboardData.map((item, index) => (
                      <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                          sx={{
                            padding: "20px",
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6">{item.title}</Typography>
                            <Typography
                              variant="h4"
                              sx={{ fontWeight: "bold", color: "#00bcd4" }}
                            >
                              {item.value}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              }
            />

            {/* Analytics Page */}
            <Route
              path="/analytics"
              element={
                <Box>
                  <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                    Analytics
                  </Typography>
                  <Typography>Coming Soon: Detailed analytics for your data.</Typography>
                </Box>
              }
            />

            {/* Settings Page */}
            <Route
              path="/settings"
              element={
                <Box>
                  <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                    Settings
                  </Typography>
                  <Typography>Manage your preferences here.</Typography>
                </Box>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default User;
