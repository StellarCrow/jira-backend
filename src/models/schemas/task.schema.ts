import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updated: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: [],
        required: true
    },
    priority: {
        type: String,
        enum: [],
        required: true
    },
    status: {
        type: String,
        enum: [],
        required: true
    },
    resolution: {
        type: String,
        enum: [],
        required: true
    },
    labels: [String]
});

export const Task = mongoose.model("Task", taskSchema);
