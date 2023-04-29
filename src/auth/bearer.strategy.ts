import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import * as process from 'process';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    super();
  }

  async validate(token: string): Promise<any> {
    let user: User;

    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.SECRET_KEY,
      });

      user = await this.usersService.getUserById(payload.id);

      // if (!user) {
      //   throw new UnauthorizedException();
      // }
    } catch (err) {
      console.log(new Date().toISOString(), token);
      throw new UnauthorizedException();
    }
    return user;
  }
}
