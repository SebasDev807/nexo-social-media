import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
  imports:[AuthModule]
})
export class PostsModule {}
