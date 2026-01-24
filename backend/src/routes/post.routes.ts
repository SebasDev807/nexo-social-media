import { Router } from "express";
import { authenticate } from "../middlewares";
import { createPostController } from "../controllers";

export const postRouter: Router = Router();

postRouter.post('/create', authenticate, createPostController);

