import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { envs } from "src/config";
import { JwtPayload } from "../interfaces";
import { UsersService } from "src/users/users.service";
import { User } from "generated/prisma/client";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly userService: UsersService
    ) {
        super({
            secretOrKey: envs.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload: JwtPayload){
        const { email } = payload;

        const user = await this.userService.findOneByFilter({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid Exception');
        }

        if (!user.isActive) {
            throw new UnauthorizedException("Inactive User")
        }

        return user;

    }

}