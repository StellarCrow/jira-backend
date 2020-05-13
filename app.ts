import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import authRouter from './src/routes/api/auth.route';
import dotenv from 'dotenv';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/jira';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/api', authRouter);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(PORT, function () {
    console.log('App is listening on port 3000!');
});
