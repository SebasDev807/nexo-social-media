import { model, Schema } from "mongoose";
import { Follow } from "../interfaces";

const FollowSchema = new Schema<Follow>({
    follower: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    following: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
});

// usuario no puede seguir 2 veces al mismo usuario
FollowSchema.index(
    { follower: 1, following: 1 },
    { unique: true }
);

FollowSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
};

export const FollowModel = model<Follow>("Follow", FollowSchema);