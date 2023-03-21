import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http.error";

export const checkSession = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.user) {
        throw new HttpError(401);
    }

    next();
}