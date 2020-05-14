import { TaskInterface } from './task.interface';

export interface UserInterface {
    email: string,
    password: string,
    name: string,
    tasks: TaskInterface[],
    assignedTasks: TaskInterface[],
}
