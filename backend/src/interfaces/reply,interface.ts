import { Types } from "mongoose";


export interface Reply {
    id: string;
    comment: Types.ObjectId;
    user: Types.ObjectId;
    text: string;
    likesCount: number;
}