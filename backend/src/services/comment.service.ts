import { User } from "../interfaces";
import { CommentModel, PostModel } from "../models";


export const commentPostService = async (text: string, postId: string, author: string) => {

    const comment = await CommentModel.create({
        text,
        post:postId,
        author
    })

    await PostModel.findByIdAndUpdate(postId, {
        $push: { comments: comment }
    });

    return comment.populate([
        { path: 'author', select: 'firstName lastName username' },
        { path: 'post', select: 'text _id' }
    ])
};