import { HttpException } from "./base.exception";

export class ConflictException extends HttpException {
    
    public statusCode = 409

    constructor(message = "Resource already exists") {
        super(message);
    }
}