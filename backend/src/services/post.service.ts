import { NotFoundException } from "../exceptions";
import { Post, User } from "../interfaces";
import { CommentModel, LikeModel, PostModel } from "../models";

export const createPostService = async (text: Post['text'], user: User['id']) => {

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
    const posts = await PostModel.find()
        .populate('author', '_id username')
        .populate({
            path: 'comments',
            select: 'text likesCount createdAt updatedAt',
            populate: {
                path: 'author',
                select: '_id username'
            }
        })
        .lean({ versionKey: false });

    return posts;
};


export const findPostById = async (idPost: Post['id']) => {

    const post = await PostModel.findById(idPost);

    if (!post) {
        throw new NotFoundException("Post not found")
    }

    return post;
}

export const likePostService = async (postId: string, user: User['id']) => {

    const postDb = await findPostById(postId);

    const existingLike = await LikeModel.findOne({
        post: postId,
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
        post: postId,
        user: user
    });


    await PostModel.findByIdAndUpdate(
        postDb._id,
        { $inc: { likesCount: 1 } }
    );

    return { liked: true };
};

export const searchPostByTextService = async (searchTerm: string) => {

    const posts = await PostModel.find({
        text: { $regex: searchTerm, $options: "i" }
    })
        .populate('author', '_id username')
        .populate({
            path: 'comments',
            select: 'text likesCount createdAt updatedAt',
            populate: {
                path: 'author',
                select: '_id username'
            }
        })
        .lean();

    if (posts.length === 0) {
        throw new NotFoundException("No posts found")
    }

    return posts;
};

export const updatePostService = async (text: string, postId: string) => {

    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { text },
        { new: true }
    );

    return updatedPost;
}

export const deletePostService = async (postId: string) => {

    //Eliminar el post
    const post = await PostModel.findByIdAndDelete(postId);

    if (!post) {
        throw new NotFoundException("Post not found");
    }

    await Promise.all([
        //Borrar todos los comentarios asociados
        CommentModel.deleteMany({ post: postId }),
        //Borrar Likes Asociados
        LikeModel.deleteMany({ post: postId })
    ])

    return post;
}