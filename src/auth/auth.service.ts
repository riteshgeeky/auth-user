import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { concat } from 'rxjs';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email,password);
  const user = await this.usersService.login(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...result } = user;
    return result;
  }
    return null;
  }

  async login(user) {
    console.log('Inside auth Service', user);
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}