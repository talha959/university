import Trycatch from "../middleware/Trycatch.js";
import { EnrollCourse } from "../models/EnrollCourse.js";
import { Courses } from "../models/Courses.js";

export const enrollCourse = Trycatch(async (req, res) => {
    try {
        // const user = req.params;
        const { courseId ,userId } = req.body;
        const course = await Courses.findById(courseId);
        
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if(course.price !== 0){
            return res.status(400).json({message: "Course is not free"});
        }
        await EnrollCourse.create({ user:userId, course: courseId });
        res.status(201).json({ course });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Server Error");
    }
}
);

export const getEnrolledCourses = Trycatch(async (req, res) => {
    try {
        const user = req.params.id;
        const courses = await EnrollCourse.find({ user }).populate("course");
        res.status(200).json({ courses });
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send("Server Error");
    }
}
);



