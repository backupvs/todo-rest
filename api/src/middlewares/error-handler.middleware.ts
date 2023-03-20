import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "http";
import { HttpError } from "../errors/http.error";

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    const message = err.message || "Internal error";
    const details = err.details || [];
    const path = req.path;

    if (err instanceof SyntaxError) {
        statusCode = 400;
    }

    if (statusCode === 500) {
        console.error(err);
    }

    res.status(statusCode).json({
        status: STATUS_CODES[statusCode],
        statusCode,
        message,
        path,
        details
    });

    next(err);
}