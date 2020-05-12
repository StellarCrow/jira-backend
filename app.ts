import express, { Request, Response, Application } from 'express';
import authRouter from './src/routes/api/auth.route';

const app: Application = express();

app.use('/api', authRouter);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
