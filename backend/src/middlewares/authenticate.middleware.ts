import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../interfaces'
import { BadRequestException, NotFoundException, UnauthorizedException } from '../exceptions'
import { envs } from '../config'
import { getUserFromDb } from '../helpers'


declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const authenticate = async (req: Request, _: Response, next: NextFunction) => {

    const bearer = req.headers.authorization

    if (!bearer) {
        throw new UnauthorizedException("No token on headers")
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        throw new UnauthorizedException("No token provided")
    }

    try {
        const result = jwt.verify(token, envs.JWT_SECRET);



        if (typeof result === 'object' && result.uid) {


            const user = await getUserFromDb(result.uid);

            console.log({ user });


            if (!user) {
                throw new NotFoundException("User does not exists")
            }

            req.user = user
            next();
        }

    } catch (error: any) {
        console.error("[authenticate]: ", error.message);
        next(error);
    }
}