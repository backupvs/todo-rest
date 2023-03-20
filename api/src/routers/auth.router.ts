import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { CreateUserDto } from "../dto/create-user.dto";
import { dtoValidator } from "../middlewares/dto-validator.middleware";

export const authRouter = Router();

authRouter
    .get('/login', authController.checkLogin)
    .post('/login', authController.login)
    .post('/register', dtoValidator(CreateUserDto) , authController.register)
    .get('/logout', authController.logout)