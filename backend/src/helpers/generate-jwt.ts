import jwt, { JwtPayload } from 'jsonwebtoken';
import { envs } from '../config';

export const generateJwt = (payload: JwtPayload) => {

    if (!envs.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in .env');
    }

    const token = jwt.sign(
        payload,
        envs.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );
    return token

}