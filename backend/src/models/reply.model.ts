import { model, Schema } from "mongoose";
import { Reply } from "../interfaces";

const ReplySchema = new Schema<Reply>({
    likesCount: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref:'Post'
    }
}, {
    timestamps: true
});

ReplySchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
};

export const ReplyModel = model<Reply>("Reply", ReplySchema);