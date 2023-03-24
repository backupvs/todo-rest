import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http.error";

export const filterValidator = (req: Request, res: Response, next: NextFunction) => {
    const { isDone } = req.query;
    
    if (isDone && !(isDone === 'true' || isDone === 'false')) {
        throw new HttpError(400, 'Bad isDone query');
    }
    
    next();
}