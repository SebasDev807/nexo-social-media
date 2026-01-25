import { Request, Response } from 'express';
import { commentPostService } from '../services';

export const commentPostController = async (req: Request, res: Response) => {
    const { idPost } = req.params;
    const { text } = req.body;

    const comment = await commentPostService(text, idPost as string, req.user);

    return res.status(201).json({
        comment
    });
}