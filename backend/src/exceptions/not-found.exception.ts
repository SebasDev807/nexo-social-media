import { HttpException } from "./base.exception";

export class NotFoundException extends HttpException {
    
    public statusCode = 404;

    constructor(message = "Resource not found"){
        super(message);
    }
}