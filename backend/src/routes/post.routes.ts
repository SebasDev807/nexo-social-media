import { Router } from "express";
import { authenticate } from "../middlewares";
import { createPostController, getPostsController, likePostController } from "../controllers";

export const postRouter: Router = Router();

postRouter.post('/create', authenticate, createPostController);
postRouter.patch('/like/:postId', authenticate, likePostController);
postRouter.get('/', authenticate, getPostsController);

