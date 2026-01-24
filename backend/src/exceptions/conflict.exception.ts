import { HttpException } from "./base.exception";

export class ConflictError extends HttpException {
    
    public statusCode = 409

    constructor(message = "Resource already exists") {
        super(message);
    }
}