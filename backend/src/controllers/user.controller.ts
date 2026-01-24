import { Request, Response } from 'express';
import { createUserService } from '../services';


export const CreateUserController = async (req: Request, res: Response) => {
    
    const newUser = await createUserService(req.body);

    return res.status(201).json({
        status: "Created",
        data: newUser
    });
}
