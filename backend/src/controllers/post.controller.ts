import { Request, Response } from 'express';
import { createPostService, getAllPostPaginatedService, likePostService } from '../services';

export const createPostController = async (req: Request, res: Response) => {

    const { text } = req.body;

    const post = await createPostService(text, req.user);

    res.status(201).json({
        post
    });

}

export const likePostController = async (req: Request, res: Response) => {

    const { postId } = req.params;

    await likePostService(postId as string, req.user);

    res.json({
        ok: true
    });
}

export const getPostsController = async (req: Request, res: Response) => {
    const posts = await getAllPostPaginatedService();

    res.json({
        posts
    });

}