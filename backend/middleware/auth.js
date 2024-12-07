import jwt from "jsonwebtoken";
import Trycatch from "./Trycatch.js";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = Trycatch(async (req, res, next) => {
    // Access the token from cookies
    const token= req.cookies.token;
    console.log("Token:", token); // Debug log to verify token presence

    if (!token) {
        return res.status(401).json({ message: "You need to Login" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
        
        console.log("Decoded Token:", decoded);
        req.email = decoded; 
        
        console.log("Email:", req.email); // Debug log to verify email
        next(); // Proceed to the next middleware or route
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Debugging JWT errors
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
});


export const isAdmin = Trycatch(async (req, res, next) => { 
    
    try{
        console.log(req.role);
        if (req.role !== "admin") {
            return res.status(403).json({ message: "You are notttt authorized" });
        }
        next();

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error",message:error.message});
    }
}
);

