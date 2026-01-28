import { Injectable, InternalServerErrorException, Logger, LoggerService } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { type User } from '../interfaces/user.interface'
import { PrismaService } from '../prisma.service';


@Injectable()
export class PostsService {

  private readonly logger = new Logger(PostsService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createPostDto: CreatePostDto, user: User) {

    try {
      //Crear Post y Relacion con Usuario
      const post = await this.prisma.post.create({
        data: {
          ...createPostDto,
          author: {
            connect: {
              id: user.id
            }
          }
        }
      });

      return post;
    } catch (error: any) {
      this.logger.error('Error creating post', error.stack);
      throw new InternalServerErrorException('Error creating post');
    }

  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
