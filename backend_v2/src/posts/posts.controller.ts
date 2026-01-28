import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Auth } from '../auth';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { type User } from '../interfaces/user.interface'
import { CheckOwner } from 'src/auth/decorators/check-owner.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Auth()
  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User

  ) {
    return this.postsService.create(createPostDto, user);
  }


  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }
  
  //Proteger esta ruta para que solo el dueño pueda eliminar el post
  @CheckOwner()
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
