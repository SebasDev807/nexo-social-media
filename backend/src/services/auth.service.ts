import { compareSync } from "bcryptjs";
import { UnauthorizedException } from "../exceptions";
import { generateJwt, getUserFromDb } from "../helpers"


export const loginService = async (email: string, password: string) => {

    const user = await getUserFromDb(email);

    if (!user) {
        throw new UnauthorizedException("The user does not exist");
    }

    if (!compareSync(password, user.password)) {
        throw new UnauthorizedException("Invalid credentials");
    }

    const token = generateJwt({ uid: user.id, email: user.email });

    return {
        user,
        token
    };

}