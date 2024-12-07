import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.get("/health", (req, res) => {
    res.send("Hello World!");
});


import userRoutes from "./routes/user.js";
import courseRoute from './routes/course.js'
import adminRoutes from './routes/admin.js'
import enrollRoutes from './routes/EnrollCourse.js'
import detailsRoutes from './routes/details.js'
app.use(cookieParser());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", courseRoute);
app.use("/api", adminRoutes);
app.use("/api", enrollRoutes);
app.use("/api", detailsRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});