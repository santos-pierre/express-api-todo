import express from 'express';
import TodoController from '@controllers/TodoController';
import ValidationData from '@middleware/ValidationData';
import TodoSchema from '@validation/TodoSchema';

const TodoRouter = express.Router();

TodoRouter.route('/').get(TodoController.index).post(ValidationData(TodoSchema), TodoController.store);

TodoRouter.get('/:slug', TodoController.show);

TodoRouter.patch('/:slug', ValidationData(TodoSchema), TodoController.update);

TodoRouter.delete('/:slug', TodoController.destroy);

export default TodoRouter;
