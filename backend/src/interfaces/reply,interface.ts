import { Comment } from "./comment.interface";
import { User } from "./user.interface";

export interface Reply {
    id: string;
    comment: Comment;
    user: User;
    text: string;
    likesCount: number;
}