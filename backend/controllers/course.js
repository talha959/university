import Trycatch from "../middleware/Trycatch.js";
import {Courses} from "../models/Courses.js";
import { Lecture } from "../models/lecture.js";

export const getAllCourses = Trycatch(async (req, res) => {
try{
    const courses = await Courses.find();
    res.status(200).json({courses});
}catch(error){
    console.log(error);
}
});

export const getCourses= Trycatch(async (req, res) => {
    try{
        const courseId = req.params.id;
        const course = await Courses.findById(courseId);
        // const courses = await Courses.find();
        if(!course){
            return res.status(404).json({message: "Course not found"});}
        res.status(200).json({course});
    }catch(error){
        console.log(error);
    }
    });


    export const searchCourses = Trycatch(async (req, res) => {
        try{
            const search = req.query.search;
            const courses = await Courses.find({title: {$regex: search, $options: "i"}});
            res.status(200).json({courses});
        }catch(error){
            console.log(error);
        }
    });


    export const getLectureofCoursebyId = Trycatch(async (req, res) => {
        try{
            const courseId = req.params.id;
            const lectures = await Lecture.find({ course: courseId });
            if(!lectures || lectures.length === 0){
                return res.status(404).json({message: "No lectures found for this course"});
            }
            res.status(200).json({lectures});
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }
    });


    export const deleteLecture = Trycatch(async (req, res) => {
        try{
            const lectureId = req.params.id;
            const lecture = await Lecture.findById(lectureId);
            if(!lecture){
                return res.status(404).json({message: "Lecture not found"});
            }
            await Lecture.deleteOne(lecture)
            res.status(200).json({message: "Lecture deleted successfully"});
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }
    }
    );


  export const deleteCourse = Trycatch(async (req, res) => {
    try{
        const courseId = req.params.id;
        const course = await Courses.findById(courseId);
        if(!course){
            return res.status(404).json({message: "Course not found"});
        }
        await Courses.deleteOne(course);
        res.status(200).json({message: "Course deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});


export const updatedCourse = Trycatch(async (req, res) => {
    try{
        const {id} = req.params;
        const updatedData = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            duration: req.body.duration,
            image: req.body.image
        };
        const updatedCourse = await Courses.findByIdAndUpdate(id, updatedData, { new: true });
        if(!updatedCourse){
            return res.status(404).json({message: "Course not found"});
        }
        res.status(200).json({updatedCourse});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});