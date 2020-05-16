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

export default router;
