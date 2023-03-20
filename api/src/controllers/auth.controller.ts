import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { HttpError } from '../errors/http.error';
import { User } from "../models/User.model";
import { UserSessionObject } from '../types/user.interface';

const SALT_ROUNDS = 10;

// Extend SessionData interface to be able store user ID
declare module 'express-session' {
    interface SessionData {
        user: UserSessionObject;
    }
}

const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    const isValid = await bcrypt.compare(password || '', user?.password || '');

    if (!user || !isValid) {
        throw new HttpError('Bad credentials', 401);
    }
    req.session.user = { _id: user._id, username: user.username };
    res.status(200).json(req.session.user);
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

    res.status(201).json({ username, _id });
}

const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) throw (err);
        res.status(200).json({ success: true });
    });
}

const checkLogin = (req: Request, res: Response) => {
    if (req.session && req.session.user) {
        return res.status(200).json({
            success: true,
            user: {
                userId: req.session.user._id,
                username: req.session.user.username
            }
        })
    }

    res.status(401).json({ success: false });
}

async function hashUserPassword(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, SALT_ROUNDS)
    }
}

export const authController = { login, register, logout, checkLogin };