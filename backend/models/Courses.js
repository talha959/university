import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"	
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const  Courses = mongoose.model("Course", courseSchema);
