import prisma from '../lib/prisma';

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
