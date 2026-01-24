import { Router } from "express";
import { loginController } from "../controllers";
import { loginSchema } from "../validators";

export const authRouter: Router = Router();

authRouter.post('/login', loginSchema, loginController);

