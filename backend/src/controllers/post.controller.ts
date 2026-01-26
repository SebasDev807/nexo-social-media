import { Request, Response } from 'express';
import {
    createPostService,
    deletePostService,
    getAllPostPaginatedService,
    likePostService,
    searchPostByTextService,
    updatePostService
} from '../services';

export const createPostController = async (req: Request, res: Response) => {

    const { text } = req.body;

    const post = await createPostService(text, req.user.id);

    return res.status(201).json({
        post
    });

}

export const likePostController = async (req: Request, res: Response) => {

    const { postId } = req.params;

    await likePostService(postId as string, req.user.id);

    return res.json({
        ok: true
    });
}

export const getPostsController = async (req: Request, res: Response) => {
    const posts = await getAllPostPaginatedService();

    return res.json({
        posts
    });

}

export const searchPostController = async (req: Request, res: Response) => {

    const { searchTerm } = req.query;

    const posts = await searchPostByTextService(searchTerm as string);

    return res.json({
        posts
    })
}

export const updatePostController = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { text } = req.body;

    const post = await updatePostService(text, postId as string);

    return res.json({
        post
    })
}

export const deletePostController = async (req: Request, res: Response) => {
    const { postId } = req.params;

    await deletePostService(postId as string)

    return res.json({
        ok: true,
        message:'Deleted'
    });
}