import { applyDecorators, UseGuards } from "@nestjs/common";
import { CheckOwnerGuard } from "../guards/check-owner.guard";
import { AuthGuard } from "@nestjs/passport";

export function CheckOwner() {
    return applyDecorators(
        UseGuards(AuthGuard(), CheckOwnerGuard)
    );
}