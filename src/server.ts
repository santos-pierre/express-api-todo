import express from 'express';
import { config } from 'dotenv-flow';
import TodoRouter from './routes/TodoRoutes';
import ApiMiddleware from './middleware/ApiMiddleware';

config();

const port = process.env.APP_PORT;
const appUrl = process.env.APP_URL;

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Hello World');
});

app.use('/api/todos', ApiMiddleware(), TodoRouter);

app.listen(port, () => {
    console.log(`Server is running on : ${appUrl}:${port}`);
});
