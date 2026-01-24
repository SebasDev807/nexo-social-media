import { UserModel } from "../models"
import mongoose from "mongoose";

export const getUserFromDb = async (term: string) => {

    if (mongoose.Types.ObjectId.isValid(term)) {
        return await UserModel.findById(term);
    }

    return await UserModel.findOne({
        $or: [
            { email: { $regex: term, $options: "i" } },
            { username: { $regex: term, $options: "i" } },
        ]
    });

}