import mongoose from 'mongoose';
import { TaskDocument } from './task.schema';

export type UserDocument = mongoose.Document & {
    email: string,
    password: string,
    name: string,
    tasks: string[] | TaskDocument[],
    assignedTasks: string[] | TaskDocument[]
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

export const User = mongoose.model<UserDocument>("User", userSchema);
