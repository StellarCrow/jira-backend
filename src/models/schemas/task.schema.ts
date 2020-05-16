import mongoose from 'mongoose';
import { UserDocument } from './user.schema';
import { taskPriorityEnum, taskResolutionEnum, taskStatusEnum, taskTypeEnum } from '../../utils/task.constants';

export type TaskDocument = mongoose.Document & {
    title: string,
    summary: string,
    description: string,
    reporter: UserDocument,
    assignee: UserDocument,
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
