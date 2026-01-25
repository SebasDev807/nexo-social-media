import { Router } from "express";
import { authenticate } from "../middlewares";
import { commentPostController } from "../controllers";

export const commentRouter: Router = Router();

commentRouter.post('/post/:idPost', authenticate, commentPostController);

