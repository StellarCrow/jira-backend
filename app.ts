import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './src/routes/api/auth.route';
import checkAuthorization from './src/routes/middleware/auth.middleware';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;
const defaultMongoUri = 'mongodb://localhost:27017/jira';
const MONGO_URI = process.env.MONGOLAB_URI || defaultMongoUri;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());


app.use('/api', authRouter);
app.use(checkAuthorization);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(PORT, function () {
    console.log('App is listening on port 3000!');
});
