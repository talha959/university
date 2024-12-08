import { 
    register,
    login,
    logout,
    userInformation,
    updatePassword,
    deleteUser,
    role
 } from "../controllers/user.js";

 import { isAuth } from "../middleware/auth.js";
import express from "express";
import cors from "cors";
const router = express.Router();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

router.use(cors(corsOptions));
router.post("/register", register);
router.post("/login", login);
router.post("/logout",isAuth, logout);
router.get("/info/:id",isAuth, userInformation);
router.put("/updatePassword",isAuth, updatePassword);
router.delete("/delete",isAuth, deleteUser);
router.get("/role",isAuth, role);
export default router;
