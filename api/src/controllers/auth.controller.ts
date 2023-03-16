import bcrypt from 'bcrypt';
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../models/User.model";
import { WrappedResponse } from "../models/WrappedResponse.model";

const SALT_ROUNDS = 10;

// Extend SessionData interface to be able store user ID
declare module 'express-session' {
    interface SessionData {
        userId: string;
    }
}

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    const isValid = await bcrypt.compare(password || '', user?.password || '');

    if (!user || !isValid) {
        return res.status(401).json({
            errors: [{
                message: 'Bad credentials'
            }]
        });
    }

    req.session.userId = user._id;
    new WrappedResponse(res).status(200).json({ username, _id: user._id });
}

const register = async (req: Request, res: Response) => {
    const createUserDto = plainToInstance(CreateUserDto, req.body);
    const errors = await validate(createUserDto, { whitelist: true, forbidNonWhitelisted: true });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const user = await User.findOne({ username: createUserDto.username }).exec();

        if (user) {
            return res.status(409).json({
                errors: [{
                    message: 'User with given username already exists'
                }]
            });
        }

        const userWithHash = await hashUserPassword(createUserDto);
        const newUser = await new User(userWithHash).save();
        const { username, _id } = newUser;

        new WrappedResponse(res).status(201).json({ username, _id });
    } catch (err) {
        throw (err);
    }
}

const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) throw (err);
        res.status(200).json({ success: true });
    });
}

async function hashUserPassword(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, SALT_ROUNDS)
    }
}

export const authController = { login, register, logout };