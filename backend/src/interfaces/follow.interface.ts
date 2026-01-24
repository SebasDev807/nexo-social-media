import { User } from "./user.interface";

export interface Follow {
    id: string;
    follower: User;
    following: User;
    createdAt: Date;
}