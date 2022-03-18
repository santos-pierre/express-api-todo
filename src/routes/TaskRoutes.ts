import express from 'express';
import TaskController from '@controllers/TaskController';

const TaskRouter = express.Router();

TaskRouter.route('/tasks').get(TaskController.index).post(TaskController.store);

TaskRouter.get('/todos/:slug/tasks/:id', TaskController.show);

TaskRouter.patch('/todos/:slug/tasks/:id', TaskController.update);

TaskRouter.delete('/todos/:slug/tasks/:id', TaskController.destroy);

export default TaskRouter;
