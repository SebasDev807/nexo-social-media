import { HttpException } from "./base.exception";

export class InternalServerError extends HttpException {
    
    public statusCode = 500;

    constructor(message = "Internal server error"){
        super(message);
    }
}