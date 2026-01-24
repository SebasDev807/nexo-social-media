import { Request, Response, NextFunction } from "express";
// import mongoose from "mongoose";
import { HttpException } from "../exceptions/base.exception";


export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    // Custom Errors
    if (err instanceof HttpException) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    /*  Duplicate entry error
    if (err.code === 11000) {
        return res.status(409).json({
            status: "error",
            message: `Duplicate value for ${Object.keys(err.keyValue).join(", ")}`
        });
    }

    //  Bad Request Errors
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({
            status: "error",
            message: "Validation error",
            errors: Object.values(err.errors).map(e => e.message)
        });
    } */


    console.error(err);

    //Internal Server Error
    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
};
