import Trycatch from "../middleware/Trycatch.js";
import { Courses } from "../models/Courses.js";
import { EnrollCourse } from "../models/EnrollCourse.js";
import { User } from "../models/user.js";

export const details = Trycatch(async (req, res) => {
    try {
        const user = await User.find();
        const course = await Courses.find();
        const enroll = await EnrollCourse.find();
        res.status(200).json({ course , user , enroll });
    }catch(error){
        console.error(`Error: ${error.message}`);
        res.status(500).send("Server Error");
    }});