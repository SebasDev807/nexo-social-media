import { model, Schema } from "mongoose";
import { Like } from "../interfaces";

const LikeSchema = new Schema<Like>({
    post: {
        type: Schema.Types.ObjectId,
        required: true
    },
    reply: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}, {
    timestamps: true
});

LikeSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
};

export const LikeModel = model<Like>("Like", LikeSchema);