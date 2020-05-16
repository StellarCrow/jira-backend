import { UserDocument } from '../models/schemas/user.schema';

export interface TaskInterface {
    _id: string,
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
}
