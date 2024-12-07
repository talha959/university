import Trycatch from "../middleware/Trycatch.js";
import {Courses} from "../models/Courses.js";

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