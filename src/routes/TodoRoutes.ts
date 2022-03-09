import express from 'express';
import TodoController from '../controllers/TodoController';

const TodoRouter = express.Router();

TodoRouter.route('/').get(TodoController.index).post(TodoController.store);

TodoRouter.get('/:slug', TodoController.show);

TodoRouter.patch('/:slug', TodoController.update);

TodoRouter.delete('/:slug', TodoController.destroy);

export default TodoRouter;
