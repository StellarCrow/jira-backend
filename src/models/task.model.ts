import { Task, TaskDocument } from './schemas/task.schema';
import { User } from './schemas/user.schema';
import { TaskInterface } from '../interfaces/task.interface';
import { taskResolution, taskStatus } from '../utils/task.constants';
import ServerError from '../errors/server.error';

class TaskModel {
    private cipher = "JST";

    public async create(newTask: Partial<TaskInterface>): Promise<TaskDocument> {
        const title = await this.generateTitle();
        const resolution = taskResolution.UNRESOLVED;
        const status = taskStatus.TODO;
        const task = { ...newTask, title, resolution, status };
        try {
            const createdTask = await Task.create(task);
            const update = { $push: { tasks: createdTask._id } };
            await User.findOneAndUpdate({ _id: createdTask.reporter }, update);
            if (newTask.assignee) {
                this.assignTaskToUser(createdTask._id, createdTask.assignee.toString());
            }
            return createdTask;
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    public async assignTaskToUser(taskId: string, userId: string): Promise<void> {
        try {
            const update = { $push: { assignedTasks: taskId } };
            await User.findOneAndUpdate({ _id: userId }, update);
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    public async assignTask(taskId: string, userId: string): Promise<void> {
        let updatedTask;
        try {
            if(userId) {
                updatedTask = await Task.findOneAndUpdate({_id: taskId}, {assignee: userId});
                await this.assignTaskToUser(taskId, userId);
            } else {
                updatedTask = await Task.findOneAndUpdate({_id: taskId}, { $unset: {assignee: ''}});
            }

            if(updatedTask) {
                await User.findOneAndUpdate({_id: updatedTask.assignee}, {$pull: {assignedTasks: taskId}});
            } else {
                throw new ServerError('Task not exist');
            }

        } catch(err) {
            throw new ServerError(err.message);
        }
    }

    public async updateField(id: string, update: object): Promise<void> {
        try {
            await Task.findOneAndUpdate({ _id: id }, update, { new: true });
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    public async getAll(): Promise<TaskDocument[]> {
        try {
            return Task.find({})
                .populate('reporter', 'name _id')
                .populate('assignee', 'name _id')
                .exec();
        } catch (err) {
            throw new ServerError(err.message);
        }
    }

    public async getById(id: string): Promise<TaskDocument | null> {
        try {
            return await Task.findById(id).populate('reporter', 'name _id');
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
