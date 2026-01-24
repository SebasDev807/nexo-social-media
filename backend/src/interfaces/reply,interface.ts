import { Post } from "./post.interface";
import { User } from "./user.interface";

export interface Reply {
    id: string;
    post: Post;
    user: User;
    text: string;
    likesCount: number;
}