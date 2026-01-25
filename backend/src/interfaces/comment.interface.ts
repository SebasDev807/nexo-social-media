import { Post } from "./post.interface";
import { User } from "./user.interface";

export interface Comment {
    id: string,
    text: string;
    author: User;
    post: Post;
    likesCount: number;
}