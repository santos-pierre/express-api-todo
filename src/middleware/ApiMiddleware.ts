import { Request, Response, NextFunction } from 'express';

/**
 * Check the 'Content-Type' from the request, if the 'Content-type' is not 'application/json' send 415 status code.
 */
const ApiMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.is('json') && ['POST', 'PATCH', 'PUT'].includes(req.protocol)) {
            return res.status(415).json({
                message: 'Unaccepted Content-Type in request. Must be type of application/json',
            });
        }
        next();
    };
};

export default ApiMiddleware;
