import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http.error";

const DEFAULT_OFFSET = '0';
const DEFAULT_LIMIT = '3';

export const paginationValidator = async (req: Request, res: Response, next: NextFunction) => {
    const offset = req.query.offset || DEFAULT_OFFSET;
    const limit = req.query.limit || DEFAULT_LIMIT;

    if (!Number.isSafeInteger(+offset)
        || !Number.isSafeInteger(+limit)
        || +offset < 0
        || +limit < 0
    ) {
        throw new HttpError(400, 'Bad pagination parameters');
    }

    req.query.offset = offset;
    req.query.limit = limit;
    next();
}