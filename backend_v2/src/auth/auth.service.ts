import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcryptjs';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto) {

    const { email, password } = loginDto;

    const user = await this.userService.findOneByFilter({ email });

    if (!user || !compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }


    const { password: _, ...safeUser} = user;

    return {
      ...safeUser,
      token: this.generateJwt({
        email: user.email,
        id: user.id
      })
    }

  }

  private generateJwt(payload: JwtPayload) {
    //Generate JWT
    return this.jwtService.sign(payload);
  }



}
