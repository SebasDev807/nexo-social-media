import { User } from "./user.interface";

export interface Post {
    id: string;
    user: User;
    text: string;
    likesCount: number;
    createdAt: Date;
    updatedAt: string;
}