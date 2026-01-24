import { Request, Response } from 'express';
import { loginService } from '../services';

export const loginController = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const { user, token } = await loginService(email, password);

    return res.json({
        user,
        token
    });

}