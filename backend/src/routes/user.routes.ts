import { Router } from "express";
import { CreateUserController } from "../controllers";
import { createUserSchema } from "../validators";

export const userRouter: Router = Router();

userRouter.post('/', createUserSchema, CreateUserController);

