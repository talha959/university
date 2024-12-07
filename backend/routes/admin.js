import express from "express";
import { isAuth ,isAdmin } from "../middleware/auth.js";
import { createCourse ,addLecture } from "../controllers/admin.js";
import {upload} from "../middleware/multer.js";
// import { addLecture } from "../controllers/admin.js";
const router = express.Router();

router.post("/create-course", isAuth,createCourse);
router.post("/add-lecture/:id", isAuth, addLecture);
export default router;