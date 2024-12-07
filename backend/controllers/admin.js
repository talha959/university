import Trycatch from "../middleware/Trycatch.js";
import {Courses} from "../models/Courses.js";
import { Lecture } from "../models/lecture.js";
export const createCourse = Trycatch(async (req, res) => {
    try{
        // const { title, description, category , createdBy, duration , price } = req.body;
        // const image = req.file;

        await Courses.create({
            title:req.body.title,
            description:req.body.description,
            category:req.body.category,
            createdBy:req.body.createdBy,
            duration:req.body.duration,
            price:req.body.price,
            image: req.body.image
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
    }
    }
    );
    
