import { TaskDocument } from '../models/schemas/task.schema';

export interface UserInterface {
    _id: string,
    email: string,
    password: string,
    name: string,
    tasks: string[] | TaskDocument[],
    assignedTasks: string[] | TaskDocument[],
}
