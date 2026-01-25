import { User } from "../interfaces";


export const returnSafeUser = (user: User) => ({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName
})