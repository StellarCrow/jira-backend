import express, { Request, Response } from 'express';
import { TaskInterface } from '../../interfaces/task.interface';
import TaskService from '../../services/task.service';

const router = express.Router();

router.post('/task', async (req: Request, res: Response) => {
    const userId = req.body.jwtUser.id;
    const assignee = req.body.assignee;
    const newTask: Partial<TaskInterface> = {
        summary: req.body.summary,
        description: req.body.description,
        reporter: userId,
        deadline: req.body.deadline,
        type: req.body.type,
        priority: req.body.priority,
        status: req.body.status,
        resolution: req.body.resolution,
    };

    if (assignee) {
        newTask.assignee = assignee;
    }

    try {
        const createdTask = await TaskService.createTask(newTask);
        return res.status(201).json({ task: createdTask })
    } catch (err) {
        if (err.name === 'ServerError') {
            return res.status(500).json({ message: err.message });
        }
        return res.status(400).json({ message: err.message });
    }


});

export default router;
