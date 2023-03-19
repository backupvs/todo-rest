import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpError } from "../errors/http.error";

export const idValidator = (req: Request, res: Response, next: NextFunction) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        throw new HttpError('Bad ObjectId', 400);
    }
    next();
}