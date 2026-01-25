import { Request, Response, NextFunction } from 'express';
import { ForbiddenException, InternalServerError, NotFoundException } from '../exceptions';
import { PostModel } from '../models';


export const checkOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { postId } = req.params;
    const userId = req.user.id;

    const post = await PostModel.findById(postId);

    if (!post) {
        throw new NotFoundException("Post Not found");
    }

    console.log(post.author.toString() === userId);

    if (post.author.toString() !== userId) {
        throw new ForbiddenException("The user does not have permissions to modify this resource");
    }

    next();


}