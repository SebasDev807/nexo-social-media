import { User } from "./user.interface";

export type JwtPayload = Pick<User, 'id' | 'email'>;