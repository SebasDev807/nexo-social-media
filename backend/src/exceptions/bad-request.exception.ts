import { HttpException } from "./base.exception";

export class BadRequestException extends HttpException {
   
    public statusCode = 400;

    constructor(message = "Bad Request"){
        super(message);
    }
}