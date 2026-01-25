import { User } from "./user.interface";

export interface Post {
    id: string;
    author: User;
    text: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: string;
}