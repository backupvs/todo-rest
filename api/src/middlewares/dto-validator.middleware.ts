import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http.error";

export const dtoValidator = <T extends Object>(cls: ClassConstructor<T>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(cls, req.body);
        let errors = await validate(
            dto,
            { whitelist: true, forbidNonWhitelisted: true }
        );

        if (errors.length > 0) {
            errors = errors.map(({ property, value, constraints }) => {
                if (property === 'password') {
                    return { property, constraints }
                }

                return { property, value, constraints }
            });
            throw new HttpError(400, 'Validation error', errors);
        }

        req.body = dto;
        next();
    }
}