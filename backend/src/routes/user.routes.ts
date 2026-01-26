import { Router } from "express";
import { CreateUserController, followUserController, getUserFollowersController } from "../controllers";
import { createUserSchema } from "../validators";
import { authenticate } from "../middlewares";

export const userRouter: Router = Router();

userRouter.post('/', createUserSchema, CreateUserController);
userRouter.patch('/follow/:followId', authenticate, followUserController);
userRouter.get('/followers', authenticate, getUserFollowersController);
