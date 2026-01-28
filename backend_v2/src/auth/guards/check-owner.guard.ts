import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CheckOwnerGuard implements CanActivate {
    constructor(
        private prisma: PrismaService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const postId = request.params.id;

        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: { authorId: true }
        });

        if (!post || post.authorId !== user.id) {
            throw new ForbiddenException('You are not the owner of this resource');
        };

        return true;
    }
}