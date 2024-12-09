import express from "express";
import { getAllCourses ,getCourses , searchCourses ,getLectureofCoursebyId, deleteLecture , deleteCourse , updatedCourse } from "../controllers/course.js";
const router = express.Router();


router.get("/get-all-courses", getAllCourses);
router.get("/get-course/:id", getCourses);
router.get("/search-courses", searchCourses);
router.get("/get-lecture/:id", getLectureofCoursebyId);
router.delete("/delete-lecture/:id", deleteLecture);
router.delete("/delete-course/:id", deleteCourse);
router.put("/update-course/:id", updatedCourse);
export default router;