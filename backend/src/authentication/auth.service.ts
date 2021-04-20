import { AuthInput } from './auth.input';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { compareSync } from 'bcrypt';
import { AuthType } from './interfaces/user.type';
import { User } from 'src/models/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findEmail(data.email);
    const validPassword = compareSync(data.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Incorrect Password');
    }

    const token = await this.jwtTokenGenerate(user);

    return {
      user,
      token,
    };
  }

  private async jwtTokenGenerate(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
