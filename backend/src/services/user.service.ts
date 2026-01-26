import { hashSync } from "bcryptjs";
import { User } from "../interfaces";
import { FollowModel, UserModel } from "../models";
import { ConflictException, NotFoundException } from "../exceptions";
import { generateUsername } from "../helpers";
import { Types } from "mongoose";


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


export const followUserService = async (followId: string, follower: User) => {
    // Busco el usuario al que quiero seguir
    const following = await UserModel.findById(followId);
    if (!following) throw new Error("User to follow not found");

    // Verifico si ya existe este follow
    const existingFollow = await FollowModel.findOne({
        follower: follower.id,   // <- usuario que está siguiendo
        following: following._id  // <- usuario al que se sigue
    });

    if (existingFollow) {
        // Si existe, lo elimino (unfollow)
        await FollowModel.findByIdAndDelete(existingFollow._id);
        return { message: "unfollowed" };
    } else {
        // Si no existe, lo creo (follow)
        await FollowModel.create({
            follower: follower.id,
            following: following._id
        });
        return { message: "followed" };
    }
};


export const getUserFollowersService = async (user: User) => {
    if (!user) throw new NotFoundException("User Not Found");

    // Traemos todos los followers de este usuario
    const followers = await FollowModel.find({ following: user.id })
        .populate('follower', 'username email') // solo info relevante del usuario
        .select('-_id -following -createdAt -updatedAt -__v') // quitamos campos innecesarios
        .exec();

    // Mapeamos para devolver solo el follower
    const cleanedFollowers = followers.map(follower => ({
        follower: follower.follower
    }));

    return cleanedFollowers;
};