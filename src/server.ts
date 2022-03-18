import express from 'express';
import { config } from 'dotenv-flow';
import TodoRouter from './routes/TodoRoutes';
import ApiMiddleware from '@middleware/ApiMiddleware';
import TaskRouter from '@routes/TaskRoutes';

config();

const { APP_PORT, APP_URL } = process.env;

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello World');
});

app.use('/api/todos', ApiMiddleware(), TodoRouter);
app.use('/api', ApiMiddleware(), TaskRouter);

app.listen(APP_PORT, () => {
    console.log(`Server is running on : ${APP_URL}:${APP_PORT}`);
});
