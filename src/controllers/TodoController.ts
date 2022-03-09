import { Request, Response } from 'express';
import Todo from '../models/Todo';

const index = async (_req: Request, res: Response) => {
    const todos = await Todo.all();
    return res.status(200).json(todos);
};

const show = async (req: Request, res: Response) => {
    try {
        const todo = await Todo.find(req.params.slug);
        return res.status(200).json(todo);
    } catch (error: any) {
        return res.status(404).json({ status: 404, message: error.message });
    }
};

const store = (_req: Request, res: Response) => {
    return res.sendStatus(501);
};

const update = (_req: Request, res: Response) => {
    return res.sendStatus(501);
};

const destroy = async (req: Request, res: Response) => {
    try {
        const deletedTodo = await Todo.delete(req.params.slug);
        return res.status(200).json(deletedTodo);
    } catch (error: any) {
        return res.status(404).json({ status: 404, message: error.message });
    }
};

const TodoController = { index, show, store, update, destroy };

export default TodoController;
