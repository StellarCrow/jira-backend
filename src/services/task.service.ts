import { TaskInterface } from '../interfaces/task.interface';
import TaskModel from '../models/task.model';


class TaskService {
    public async createTask(task: Partial<TaskInterface>): Promise<TaskInterface> {
        return await TaskModel.create(task);
    }

    public async getAllTasks(): Promise<TaskInterface[]> {
        return await TaskModel.getAll();
    }

    public async getTask(id: string): Promise<TaskInterface | null> {
        return await TaskModel.getById(id);
    }

    public async updateField(id: string, update: object): Promise<void> {
        await TaskModel.updateField(id, update);
    }

    public async assignTask(taskId: string, userId: string): Promise<void> {
        await TaskModel.assignTask(taskId, userId);
    }
}

export default new TaskService();
