import { Types } from "mongoose";

export interface Like {
  id: string;
  user: Types.ObjectId;
  post?: Types.ObjectId;   
  reply?: Types.ObjectId;  
  comment?:Types.ObjectId;
}


