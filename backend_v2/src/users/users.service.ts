import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  async registerUser(createUserDto: CreateUserDto) {

    const { email, username, password, birthdate, ...rest } = createUserDto;

    const userExists = await this.findOneByFilter({ email, username });

    if (userExists) {
      throw new ConflictException("User already exists");
    }

    const newUser = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hashSync(password, 10),
        birthdate: new Date(birthdate),
        ...rest
      },
      omit: { password: true }
    });


    return newUser;



  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(id: string) {
    return this.findOneByFilter({ id });
  }

  async findOneByFilter(...filters: { id?: string; email?: string, username?: string }[]) {

    const user = await this.prisma.user.findFirst({
      where: {
        OR: filters
      },
     
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
