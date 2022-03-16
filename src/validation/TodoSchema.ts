import prisma from 'lib/prisma';
import slugify from 'slugify';
import * as yup from 'yup';

const TodoSchema = yup.object({
    title: yup
        .string()
        .required()
        .test({
            name: 'unique',
            message: 'This todo list already exist.',
            test: (value) => (value ? checkUnique(value) : false),
        }),
});

const checkUnique = async (value: string) => {
    try {
        const count = await prisma.todo.count({ where: { slug: slugify(value, { lower: true }) } });
        return count === 0;
    } catch (error) {
        return false;
    }
};

export default TodoSchema;
