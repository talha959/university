// import { request, response } from "express";
import {User} from "../models/user.js";
import bcrypt from "bcrypt";
// import send from "../services/send.js";
import jwt from "jsonwebtoken";
import Trycatch from "../middleware/Trycatch.js";
import dotenv from "dotenv";
// import { resolveContent } from "nodemailer/lib/shared/index.js";
dotenv.config();

export const register = Trycatch(async (req, res) => {
    try {
        console.log(req.body);
        if (!req.body) {
            return res.status(400).json("Request body is missing");
        }
        const { name, email, password , country } = req.body;
        
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
           password: hashedPassword,
            country,
        });
        await newUser.save();
        const otp= Math.floor(1000 + Math.random() * 9000);
        const activationToken =jwt.sign({email:email,otp:otp},process.env.JWT_SECRET,{expiresIn:"10m"});
        
        // await send(email, "Account Activation", `Your OTP is ${otp}`);
        res.status(201).json(`User Created Successfully, Activation Token: ${activationToken}`);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Server Error");
    }
});

//login


export const login = Trycatch(async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json("Request body is missing");
        }
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json("User does not exist");
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json("Password is incorrect");
        }
        const token = jwt.sign(
            { existingUser  }, 
            process.env.JWT_SECRET, 
            { expiresIn: "24h" } 
        );
        
        
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", // Prevent cross-site request forgery (CSRF)
        });
        res.status(200).json({ message:"Login Sucessfull", token });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Server Error");
    }
}
);


export const logout = Trycatch(async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    try {
        if (!token) {
            return res.status(400).json("User not logged in");
        }
        res.clearCookie("token");
        res.status(200).json("User logged out successfully");
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Server Error");
    }
});

export const userInformation = Trycatch(async (req, res) => {
    try {
        const dataId=req.params.id;
        const user = await User.findById(dataId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Server Error");
    }
}
);

export const updatePassword = Trycatch(async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.email.id); 
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json("Old password is incorrect");
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json("Password updated successfully");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Server Error");
    }
}
);

export const deleteUser = Trycatch(async (req, res) => {
    try {
        const user=await User.findById(req.email.id);
        res.clearCookie("token");
        if (!user) {
            return res.status(400).json("User does not exist");
        }
        await User.findByIdAndDelete(req.email.id);
        res.status(200).json("User deleted successfully");
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Server Error");
    }
}
);