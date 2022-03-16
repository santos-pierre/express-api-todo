import prisma from '../lib/prisma';
import slugify from 'slugify';

class Todo {
    public static all = async (): Promise<Todo[]> => {
        const todos = await prisma.todo.findMany();
        return todos;
    };

    public static find = async (slug: string): Promise<Todo> => {
        const todo = await prisma.todo.findUnique({ where: { slug } });
        if (!todo) {
            throw new Error(`Todo with slug: '${slug}' does not exist.`);
        }
        return todo;
    };

    public static store = async (attributes: { title: string }) => {
        try {
            const data = { ...attributes, slug: slugify(attributes.title, { lower: true }) };
            const newTodo = await prisma.todo.create({ data });
            return newTodo;
        } catch (error) {
            throw new Error(`Something went wrong while storing your data! Please try again later! `);
        }
    };

    public static update = async (slug: string, attributes: { title: string }) => {
        try {
            const data = { ...attributes, slug: slugify(attributes.title, { lower: true }) };
            const updatedTodo = await prisma.todo.update({ where: { slug }, data });
            return updatedTodo;
        } catch (error) {
            console.log(error);

            // throw new Error(`Something went wrong while storing your data! Please try again later! `);
        }
    };

    public static delete = async (slug: string) => {
        try {
            const deletedTodo = await prisma.todo.delete({ where: { slug } });
            return deletedTodo;
        } catch (error) {
            throw new Error(`Todo with slug: '${slug}' does not exist.`);
        }
    };
}

export default Todo;
