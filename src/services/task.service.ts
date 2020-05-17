import { TaskInterface } from '../interfaces/task.interface';
import TaskModel from '../models/task.model';


class TaskService {
    public async createTask(task: Partial<TaskInterface>): Promise<TaskInterface> {
        return await TaskModel.create(task);
    }

    public async getAllTasks(): Promise<TaskInterface[]> {
        return await TaskModel.getAll();
    }
}

export default new TaskService();
