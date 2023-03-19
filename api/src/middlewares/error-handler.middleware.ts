import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http.error";
import { STATUS_CODES } from "http";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!err) next();

    let statusCode = 500;
    let message = 'Internal error';
    let details = [];
    const path = req.path;

    if (err instanceof HttpError) {
        statusCode = err.statusCode;
        message = err.message;
        details = err.details;
    } else if (err instanceof SyntaxError) {
        statusCode = 400;
        message = err.message;
    }

    console.error(err);

    return res.status(statusCode).json({
        status: STATUS_CODES[statusCode],
        statusCode,
        message,
        path,
        details
    });
}