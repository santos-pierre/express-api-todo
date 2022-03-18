import { Request, Response } from 'express';
import Task from '@models/Task';

const index = async (_: Request, res: Response) => {
    const todos = await Task.all();
    return res.status(200).json(todos);
};

const tasksByTodo = async (req: Request, res: Response) => {};

const show = async (req: Request, res: Response) => {
    try {
        const todo = await Task.find(req.params.slug);
        return res.status(200).json(todo);
    } catch (error: any) {
        return res.status(404).json({ status: 404, message: error.message });
    }
};

const store = async (req: Request, res: Response) => {
    try {
        const newTodo = await Task.store(req.body);
        return res.status(201).json(newTodo);
    } catch (error: any) {
        return res.status(503).json({ status: 503, message: error.message });
    }
};

const update = async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
        const updatedTodo = await Task.update(slug, req.body);
        return res.status(200).json(updatedTodo);
    } catch (error: any) {
        return res.status(503).json({ status: 503, message: error.message });
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const deletedTodo = await Task.delete(req.params.slug);
        return res.status(200).json(deletedTodo);
    } catch (error: any) {
        return res.status(404).json({ status: 404, message: error.message });
    }
};

const TaskController = { index, show, store, update, destroy };

export default TaskController;
