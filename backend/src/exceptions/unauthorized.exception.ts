import { HttpException } from "./base.exception";

export class UnauthorizedException extends HttpException {

    public statusCode = 401

    constructor(message = "Unauthorized") {
        super(message);
    }
}