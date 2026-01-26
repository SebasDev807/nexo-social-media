import { Request, Response } from 'express';
import { createUserService, followUserService, getUserFollowersService } from '../services';
import { Types } from 'mongoose';


export const CreateUserController = async (req: Request, res: Response) => {

    const newUser = await createUserService(req.body);

    return res.status(201).json({
        status: "Created",
        data: newUser
    });
}

export const followUserController = async (req: Request, res: Response) => {

    const { followId } = req.params;

    const message = await followUserService(followId as string, req.user);

    return res.json({
        message
    });
}

export const getUserFollowersController = async (req: Request, res: Response) => {
    
    const followers = await getUserFollowersService(req.user);
    
    return res.json({
        followers
    });
}
