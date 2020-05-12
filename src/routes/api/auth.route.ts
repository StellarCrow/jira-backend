import express, {  Request, Response } from 'express';

const router = express.Router();

router.get('/login', async (req: Request, res: Response) => {
    res.send('Login page');
});

export default router;
