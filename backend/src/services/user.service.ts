import { hashSync } from "bcryptjs";
import { User } from "../interfaces";
import { UserModel } from "../models";
import { ConflictException } from "../exceptions";
import { generateUsername } from "../helpers";


export const createUserService = async (user: User) => {

    const { firstName, lastName, email, password } = user;

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        throw new ConflictException(`User already exists`)
    }

    const newUser = await UserModel.create({
        ...user,
        username: generateUsername(firstName, lastName),
        password: hashSync(password, 10)
    });

    return newUser;

}