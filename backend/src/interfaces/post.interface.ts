import { Types } from "mongoose";


export interface Post {
    id: string;
    author: Types.ObjectId;
    text: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: string;
    comments: Types.ObjectId[];
}