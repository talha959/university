import {enrollCourse , getEnrolledCourses} from "../controllers/EnrollCourse.js";
import express from "express";
import { isAuth } from "../middleware/auth.js";
const router = express.Router();
router.post("/enroll-course", isAuth, enrollCourse);
router.get("/get-enrolled-courses/:id", isAuth, getEnrolledCourses);
export default router;