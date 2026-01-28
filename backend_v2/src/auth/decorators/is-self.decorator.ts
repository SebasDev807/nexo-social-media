import { applyDecorators, UseGuards } from "@nestjs/common";
import { IsSelfGuard } from "../guards/is-self.guard";
import { AuthGuard } from "@nestjs/passport";

export function IsSelf() {
    return applyDecorators(
        UseGuards(AuthGuard(), IsSelfGuard)
    );
}