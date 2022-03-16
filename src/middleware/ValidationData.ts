import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema, ValidationError } from 'yup';
import FormErrors from '../types/FormErrors';

/**
 *  Middleware to validate and format yup errors.
 * @param {AnyObjectSchema} schema Yup schema to validate
 * @returns The formatted errors if the validation fails.
 */

const ValidationData = (schema: AnyObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Option abortEarly to false, to retrieve all the errors and not just stop at the first encounter.
            await schema.validate(req.body, { abortEarly: false });
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                const { inner } = error;
                /**
                 * Format Errors form yup
                 * {
                 *    field : {
                 *       type: Error Type (required, min, ...),
                 *       message: Error Message,
                 *       value: Value of the field,
                 *    }
                 * }
                 */
                const formattedErrors = inner.reduce((errors: FormErrors, obj) => {
                    let key = obj['path'];
                    if (key) {
                        if (!errors[key]) {
                            errors[key] = {
                                type: obj.type,
                                message: obj.errors[0],
                                value: obj.value,
                            };
                        }
                    }
                    return errors;
                }, {});

                return res.status(422).json(formattedErrors);
            }
        }
    };
};

export default ValidationData;
