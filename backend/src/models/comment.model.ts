import { model, Schema } from "mongoose";
import { Comment } from "../interfaces";

const CommentSchema = new Schema<Comment>({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    likesCount: {
        type: Number,
        default: 0
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

CommentSchema.methods.toJSON = function () {
    const { __v, id, ...rest } = this.toObject();
    return rest;
};

export const CommentModel = model<Comment>("Comment", CommentSchema);