import mongoose from 'mongoose';
import { taskPriorityEnum, taskResolutionEnum, taskStatusEnum, taskTypeEnum } from '../../utils/task.constants';
import { UserDocument } from './user.schema';

export type TaskDocument = mongoose.Document & {
    title: string,
    summary: string,
    description: string,
    reporter: string | UserDocument,
    assignee: string | UserDocument,
    created: Date,
    updated: Date,
    deadline: Date,
    type: string,
    priority: string,
    status: string,
    resolution: string
    labels: string[]
};

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true
    },
    description: String,
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created: {
        type: Date,
        default: new Date(),
        required: true,
    },
    updated: {
        type: Date,
        default: new Date(),
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    type: {
        type: String,
        enum: taskTypeEnum,
        required: true
    },
    priority: {
        type: String,
        enum: taskPriorityEnum,
        required: true
    },
    status: {
        type: String,
        enum: taskStatusEnum,
        required: true
    },
    resolution: {
        type: String,
        enum: taskResolutionEnum,
        required: true
    },
    labels: [String]
});

export const Task = mongoose.model<TaskDocument>("Task", taskSchema);
