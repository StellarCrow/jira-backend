import express, { Request, Response } from 'express';
import AuthService from '../../services/auth.service';
import { UserInterface } from '../../interfaces/user.interface';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const userInfo: Pick<UserInterface, 'email' | 'password'> = {
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const { token, user } = await AuthService.login(userInfo);
        return res.status(200).json({ user, token });
    } catch (err) {
        if (err.name === 'ServerError') {
            return res.status(500).json({ message: err.message });
        }
        return res.status(400).json({ message: err.message });
    }
});

router.post('/register', async (req: Request, res: Response) => {
    const newUser: Omit<UserInterface, 'tasks' | 'assignedTasks' | '_id'> = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    };

    try {
        const user = await AuthService.registrate(newUser);
        return res.status(201).json({ user });
    } catch (err) {
        if (err.name === 'ServerError') {
            return res.status(500).json({ message: err.message });
        }
        return res.status(400).json({ message: err.message });
    }

});

export default router;
