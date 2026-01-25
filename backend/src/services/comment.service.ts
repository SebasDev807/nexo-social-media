import { Post, User } from "../interfaces";
import { CommentModel, PostModel } from "../models";
import { findPostById } from "./post.service";

export const commentPostService = async (text: string, postId: string, author: User) => {

    const post = await findPostById(postId);

    const comment = await CommentModel.create({ text, post, author })

    await PostModel.findByIdAndUpdate(postId, {
        $push: { comments: comment }
    });

    return comment.populate([
        { path: 'author', select: 'firstName lastName username' },
        { path: 'post', select: 'text _id' }
    ])
};