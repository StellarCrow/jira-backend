import express, { Request, Response } from 'express';
import UserService from '../../services/user.service';

const router = express.Router();

router.get('/login', async (req: Request, res: Response) => {
    const userInfo = {
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const { token, user } = await UserService.login(userInfo);
        return res.status(200).json({ user: user, token: token });
    } catch (err) {
        if (err.name === 'ServerError') {
            return res.status(500).json({ error: err.message });
        }
        return res.status(400).json({ error: err.message });
    }
});

export default router;
