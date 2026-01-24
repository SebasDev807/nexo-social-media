import { model, Schema } from "mongoose";
import { Post } from "../interfaces";

const PostSchema = new Schema<Post>({
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likesCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

PostSchema.methods.toJSON = function () {
  const { __v, ...rest } = this.toObject();
  return rest;
};

export const PostModel = model<Post>("Post", PostSchema);