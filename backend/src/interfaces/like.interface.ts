import { Post } from "./post.interface";
import { Reply } from "./reply,interface";
import { User } from "./user.interface";
import { Comment } from "./comment.interface";

export interface Like {
  id: string;
  user: User;
  post?: Post;   
  reply?: Reply;  
  comment?:Comment;
}


