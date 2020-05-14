import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET || "123";

export default (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const jwtToken = req.headers['authorization'].split(' ')[1];
    try {
        req.body.jwtUser = jwt.verify(jwtToken, secret);
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    next();
};
