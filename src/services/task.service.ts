import { TaskInterface } from '../interfaces/task.interface';
import TaskModel from '../models/task.model';


class TaskService {
    public async createTask(task: Partial<TaskInterface>): Promise<TaskInterface> {
        return await TaskModel.create(task);
    }
}

export default new TaskService();
