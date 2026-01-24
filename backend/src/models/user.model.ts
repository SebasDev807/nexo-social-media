import { model, Schema } from "mongoose";
import { User } from "../interfaces";

const UserSchema = new Schema<User>({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Invalid Email Format"
        ]
    },

    username: {
        type: String,
        unique: true
    },

    password: {
        type:String,
        minlength: 8,
        required: true
    },

    birthdate: {
        required: true,
        type: Date
    },

    phoneNumber: {
        type: Number
    },

    isActive: {
        default: false,
        type: Boolean
    },

    occupation: {
        type: String
    },

    livesIn: {
        type: String
    },

    about: {
        type: String
    },

    slogan: {
        type: String
    },
},
    {
        timestamps: true
    }
)

UserSchema.methods.toJSON = function () {
    const { __v, password, ...rest } = this.toObject();
    return rest
}

export const UserModel = model<User>('User', UserSchema);

