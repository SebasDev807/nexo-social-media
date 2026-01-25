import { NotFoundException } from "../exceptions";
import { Post, User } from "../interfaces";
import { LikeModel, PostModel } from "../models";

export const createPostService = async (text: Post['text'], user: User) => {

    const post = await PostModel.create({
        text,
        author: user
    })

    return post.populate({
        path: 'author',
        select: '_id username firstName lastName'
    })

};


export const getAllPostPaginatedService = async () => {
    
    const posts = await PostModel.find({})
        .limit(20);

    return posts
}


export const findPostById = async (idPost: Post['id']) => {

    const post = await PostModel.findById(idPost);

    if (!post) {
        throw new NotFoundException("Post not found")
    }

    return post
}


export const likePostService = async (postId: string, user: User) => {

    const postDb = await findPostById(postId);

    const existingLike = await LikeModel.findOne({
        post: postDb,
        user
    });

    // Si ya existe unlike
    if (existingLike) {
        await LikeModel.deleteOne({ _id: existingLike._id });

        await PostModel.findByIdAndUpdate(
            postDb._id,
            { $inc: { likesCount: -1 } }
        );

        return { liked: false };
    }

    // Si no existe se agrega un Like
    await LikeModel.create({
        post: postDb,
        user: user
    });


    await PostModel.findByIdAndUpdate(
        postDb._id,
        { $inc: { likesCount: 1 } }
    );

    return { liked: true };
};