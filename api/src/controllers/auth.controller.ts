import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { HttpError } from '../errors/http.error';
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
        throw new HttpError('Bad credentials', 401);
    }

    req.session.userId = user._id;
    new WrappedResponse(res).status(200).json({ username, _id: user._id });
}

const register = async (req: Request, res: Response) => {
    const createUserDto: CreateUserDto = req.body;
    const user = await User.findOne({ username: createUserDto.username }).exec();

    if (user) {
        throw new HttpError('User with given username already exists', 409);
    }

    const userWithHash = await hashUserPassword(createUserDto);
    const newUser = await new User(userWithHash).save();
    const { username, _id } = newUser;

    new WrappedResponse(res).status(201).json({ username, _id });
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