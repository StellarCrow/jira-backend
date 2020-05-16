import { Task } from './schemas/task.schema';
import { User } from './schemas/user.schema';
import { TaskInterface } from '../interfaces/task.interface';
import { taskResolution, taskStatus } from '../utils/task.constants';
import ServerError from '../errors/server.error';

class TaskModel {
    private cipher = "JST";

    public async create(newTask: Partial<TaskInterface>): Promise<TaskInterface> {
        const title = await this.generateTitle();
        const resolution = taskResolution.UNRESOLVED;
        const status = taskStatus.TODO;
        const task = { ...newTask, title, resolution, status };
        try {
            const createdTask = await Task.create(task);
            const update = { $push: { tasks: createdTask._id } };
            await User.findOneAndUpdate({ _id: createdTask.reporter }, update);
            return createdTask;
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    private async generateTitle(): Promise<string> {
        try {
            let count = await Task.countDocuments();
            return `${this.cipher}-${++count}`;
        } catch (err) {
            throw new ServerError(err.message);
        }

    }
}

export default new TaskModel();
