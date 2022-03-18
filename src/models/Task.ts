import prisma from '../lib/prisma';
import slugify from 'slugify';

class Task {
    public static all = async (): Promise<Task[]> => {
        const tasks = await prisma.task.findMany();
        return tasks;
    };

    public static find = async (id: string): Promise<Task> => {
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) {
            throw new Error(`Todo with slug: '${task}' does not exist.`);
        }
        return task;
    };

    public static store = async (attributes: { title: string }): Promise<Task> => {
        try {
            const data = { ...attributes, slug: slugify(attributes.title, { lower: true }) };
            const newTodo = await prisma.todo.create({ data });
            return newTodo;
        } catch (error) {
            throw new Error(`Something went wrong while storing your data! Please try again later! `);
        }
    };

    public static update = async (slug: string, attributes: { title: string }): Promise<Task> => {
        try {
            const data = { ...attributes, slug: slugify(attributes.title, { lower: true }) };
            const updatedTodo = await prisma.todo.update({ where: { slug }, data });
            return updatedTodo;
        } catch (error) {
            throw new Error(`Something went wrong while storing your data! Please try again later! `);
        }
    };

    public static delete = async (slug: string): Promise<Task> => {
        try {
            const deletedTodo = await prisma.todo.delete({ where: { slug } });
            return deletedTodo;
        } catch (error) {
            throw new Error(`Todo with slug: '${slug}' does not exist.`);
        }
    };
}

export default Task;
