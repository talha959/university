import Trycatch from "../middleware/Trycatch.js";
import {Courses} from "../models/Courses.js";
import { Lecture } from "../models/lecture.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const createCourse = Trycatch(async (req, res) => {
    try{
        // const { title, description, category , createdBy, duration , price } = req.body;
        // const image = req.file;
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
        console.log(decoded?.existingUser?._id)
        await Courses.create({
            title:req.body.title,
            description:req.body.description,
            category:req.body.category,
            duration:req.body.duration,
            image: req.body.image,
            createBy:decoded?.existingUser?._id
        });
        res.status(201).json({message: "Course created successfully"});
    }catch(error){
        console.log(error);
    }
});


export const addLecture = Trycatch(async (req, res) => {
    try{
        const course = await Courses.findById(req.params.id);
        
        if(!course){
            return res.status(404).json({message: "Course not found"});
        }
        
        await Lecture.create({
            title:req.body.title,
            description:req.body.description,
            video:req.body.video,
            course: req.params.id
        });
        res.status(201).json({message: "Lecture added successfully"});

    }catch(error){

        console.log(error);
        res.status(500).json({message: "Internal server error", response: error});
    }
}
);


export const getAllLectures = Trycatch(async (req, res) => {
    try{
        const lectures = await Lecture.find();
        res.status(200).json({lectures});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error", response: error});    }
    }
    );
    
export const getCreatedCourse = Trycatch(async (req, res) => {
try{
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token
    const createBy= decoded?.existingUser?._id
    console.log(createBy);
    const course = await Courses.find({ createBy });
    res.status(200).json({ course });
}catch(error){
    console.log(error);
    res.status(500).json({message: "Internal server error", response: error});
}
});