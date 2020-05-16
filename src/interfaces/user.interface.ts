import { TaskInterface } from './task.interface';

export interface UserInterface {
    _id: string,
    email: string,
    password: string,
    name: string,
    tasks: TaskInterface[],
    assignedTasks: TaskInterface[],
}
