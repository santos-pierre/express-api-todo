import express from 'express';
import { config } from 'dotenv-flow';
import TodoRouter from './routes/TodoRoutes';

config();

const port = process.env.APP_PORT;
const appUrl = process.env.APP_URL;

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello World');
});

app.use('/todos', TodoRouter);

app.listen(port, () => {
    console.log(`Server is running on : ${appUrl}:${port}`);
});
