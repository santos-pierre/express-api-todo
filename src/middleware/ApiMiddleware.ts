import { Request, Response, NextFunction } from 'express';

/**
 * Check the 'Content-Type' from the request, if the 'Content-type' is not 'application/json' send 415 status code.
 * @returns
 */
const ApiMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (['POST', 'PATCH'].indexOf(req.method) === -1) {
            if (!req.accepts('json')) {
                return res.status(406).json({
                    message: 'Invalid request header. Must be type of application/json',
                });
            }
        }
        next();
    };
};

export default ApiMiddleware;
