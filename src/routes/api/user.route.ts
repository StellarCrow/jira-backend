import express, { Request, Response } from 'express';
import UserService from "../../services/user.service";

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await UserService.getUsers();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.get('/user', async (req: Request, res: Response) => {
    const id = req.body.jwtUser.id;
    try {
        const user = await UserService.getUser(id);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json(user);
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;
