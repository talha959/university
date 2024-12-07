import express from "express";
import { getAllCourses ,getCourses , searchCourses } from "../controllers/course.js";
const router = express.Router();


router.get("/get-all-courses", getAllCourses);
router.get("/get-course/:id", getCourses);
router.get("/search-courses", searchCourses);
export default router;