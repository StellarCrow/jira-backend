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

    if (assignee !== 'unassigned') {
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

router.get('/task', async (req: Request, res: Response) => {
    try {
        const tasks = await TaskService.getAllTasks();
        return res.status(200).json({ tasks })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.get('/task/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const task = await TaskService.getTask(id);
        if (task) {
            return res.status(200).json({ task })
        } else {
            return res.status(404).json({ task });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.patch('/task/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    const update = req.body.update;

    try {
        await TaskService.updateField(id, update);
        return res.status(200).json({ message: "updated" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.patch('/task/:id/assign', async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.body.update && req.body.update.assignee === 'unassigned' ? null : req.body.update.assignee;

    try {
        await TaskService.assignTask(id, user);
        return res.status(200).json({ message: "updated" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

export default router;
