import { Types } from "mongoose";
import { Post } from "./post.interface";
import { User } from "./user.interface";

export interface Comment {
    id: string,
    text: string;
    author: Types.ObjectId;
    post: Types.ObjectId;
    likesCount: number;
}