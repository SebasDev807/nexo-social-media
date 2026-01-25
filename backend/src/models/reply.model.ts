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
    comment: {
        type: Schema.Types.ObjectId,
        ref:'Comment'
    }
}, {
    timestamps: true
});

ReplySchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
};

export const ReplyModel = model<Reply>("Reply", ReplySchema);