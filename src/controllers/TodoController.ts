import { Request, Response } from 'express';
import Todo from '@models/Todo';

const index = async (_: Request, res: Response) => {
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

const store = async (req: Request, res: Response) => {
    try {
        const newTodo = await Todo.store(req.body);
        return res.status(201).json(newTodo);
    } catch (error: any) {
        return res.status(503).json({ status: 503, message: error.message });
    }
};

const update = async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
        const updatedTodo = await Todo.update(slug, req.body);
        return res.status(200).json(updatedTodo);
    } catch (error: any) {
        return res.status(503).json({ status: 503, message: error.message });
    }
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
