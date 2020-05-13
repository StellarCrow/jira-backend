import { UserDocument } from '../models/schemas/user.schema';
import { UserInterface } from './user.interface';

export interface TaskInterface {
    title: string,
    description: string,
    reporter: UserInterface,
    assignee: UserInterface,
    created: Date,
    updated: Date,
    deadline: Date,
    type: string,
    priority: string,
    status: string,
    resolution: string
    labels: string[]
}
