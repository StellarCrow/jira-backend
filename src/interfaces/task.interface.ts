import { UserInterface } from './user.interface';

export interface TaskInterface {
    _id: string,
    title: string,
    summary: string,
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
