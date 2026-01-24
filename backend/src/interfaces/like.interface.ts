import { Post } from "./post.interface";
import { Reply } from "./reply,interface";
import { User } from "./user.interface";

export interface Like {
  id: string;
  user: User;
  post?: Post;   
  reply?: Reply;  
}


