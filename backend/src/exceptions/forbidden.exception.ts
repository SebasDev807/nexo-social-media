import { HttpException } from "./base.exception";

export class ForbiddenException extends HttpException {
    
    public statusCode = 403

    constructor(message = "Access to the resource is not allowed") {
        super(message);
    }
}