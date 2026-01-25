import { Router } from "express";
import { authenticate, checkOwner } from "../middlewares";
import { postSchema } from "../validators";
import {
    createPostController,
    deletePostController,
    getPostsController,
    likePostController,
    searchPostController,
    updatePostController
} from "../controllers";

export const postRouter: Router = Router();

postRouter.get('/',
    authenticate,
    getPostsController
);

postRouter.get('/search',
    authenticate,
    searchPostController
)

postRouter.post('/create',
    authenticate,
    postSchema,
    createPostController
);

postRouter.patch('/like/:postId',
    authenticate,
    likePostController
);

postRouter.patch('/update/:postId',
    authenticate,
    checkOwner,
    updatePostController
);

postRouter.delete('/delete/:postId',
    authenticate,
    checkOwner,
    deletePostController
)
