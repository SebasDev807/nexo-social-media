import { model, Schema } from "mongoose";
import { Like } from "../interfaces";

const LikeSchema = new Schema<Like>({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    reply: {
        type: Schema.Types.ObjectId,
        ref: 'Reply'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

LikeSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
};

export const LikeModel = model<Like>("Like", LikeSchema);