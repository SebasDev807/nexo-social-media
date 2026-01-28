import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hashSync } from 'bcryptjs';
import { SearchTerm } from './interfaces/search-term.interface';

@Injectable()
export class UsersService {

  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService
  ) { }

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

  /**
   * Busca un usuario por un término flexible e incluye sus publicaciones.
   *
   * El término de búsqueda puede coincidir con:
   * - ID del usuario
   * - Correo electrónico
   * - Nombre de usuario
   *
   * Este método se utiliza normalmente para vistas de perfil
   * donde se necesita mostrar la información del usuario junto con sus posts.
   *
   * @param searchTerm Valor usado para buscar al usuario (id, email o username)
   * @returns Usuario con sus posts incluidos, o null si no se encuentra
   */
  async findOneWithPosts(searchTerm: string) {
    return await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: searchTerm },
          { email: searchTerm },
          { username: searchTerm }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        slogan: true,
        posts: {
          select: {
            id: true,
            content: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneById(id: string) {
    return this.findOneByFilter({ id });
  }

  async findOneByFilter(...filters: SearchTerm[]) {

    const user = await this.prisma.user.findFirst({
      where: {
        OR: filters
      },

    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {

      const { password, ...safeUser } = updateUserDto;

      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { ...safeUser },
        omit: { password: true }
      });
  
      return updatedUser;
      
    } catch (error) {
      this.logger.error('Error updating user', error.stack);
      throw new ConflictException('Error updating user');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
