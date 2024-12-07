import mongoose from "mongoose";

const enrollCourseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "enrolled",
    }
});

export const EnrollCourse = mongoose.model("EnrollCourse", enrollCourseSchema);