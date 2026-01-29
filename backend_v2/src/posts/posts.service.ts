import { Injectable, InternalServerErrorException, Logger, LoggerService, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { type User } from '../interfaces/user.interface'
import { PrismaService } from '../prisma.service';
import { PaginationDto } from 'src/common';
import { validate as isUuid } from 'uuid';


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

  async findAll(paginationDto: PaginationDto) {

    const { page = 1, limit = 10 } = paginationDto;

    const [posts, totalItems] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          content: true,
          comments: true,
          likes: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              username: true
            }
          }
        }
      }),
      this.prisma.post.count()
    ]);

    return {
      posts,
      totalItems,
    }
  }

  async findByTerm(searchTerm: string) {

    // Si el término de búsqueda es un UUID, buscar por ID
    if (isUuid(searchTerm)) {
      return this.prisma.post.findUnique({
        where: {
          id: searchTerm
        },
        select: {
          id: true,
          content: true,
          comments: true,
          likes: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              username: true
            }
          }
        }
      });
    }

    // Si no es un UUID, buscar por contenido
    const posts = await this.prisma.post.findMany({
      where: {
        content: {
          contains: searchTerm,
          mode: 'insensitive'
        },
      },
      select: {
        id: true,
        content: true,
        comments: true,
        likes: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            username: true
          }
        }
      }
    });

    if (posts.length === 0) {
      throw new NotFoundException(`No posts found matching: ${searchTerm}`);
    }

    return {
      posts
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {

    await this.findByTerm(id);

    const updatedPost = await this.prisma.post.update({
      where: {
        id: id
      },
      data: {
        ...updatePostDto
      }
    });

    return { updatedPost };

  }

  async deletePost(id: string) {
    try {
      await this.prisma.post.delete({
        where: {
          id: id
        }
      });

      return { message: 'Post deleted successfully' };

    } catch (error: any) {
      this.logger.error('Error deleting post', error.stack);
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
}
