import { Types } from "mongoose";
import { User } from "./user.interface";

export interface Follow {
    id: string;
    follower: Types.ObjectId;
    following: Types.ObjectId;
    createdAt: Date;
}