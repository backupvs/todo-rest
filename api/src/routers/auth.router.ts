import { Router } from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter
    .post('/login', authController.login)
    .post('/register', authController.register)
    .get('/logout', authController.logout)