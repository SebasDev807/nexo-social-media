import { Request, Response } from 'express';

export const createPostController = (req: Request, res: Response) => {
    res.json({
        ok: true
    });
}