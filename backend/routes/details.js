// import Trycatch from "../middleware/Trycatch.js";
import { details } from "../controllers/Details.js";
import express from "express";
const router = express.Router();
router.get("/details", details);
export default router;
