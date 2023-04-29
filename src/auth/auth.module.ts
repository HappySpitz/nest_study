import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { BearerStrategy } from './bearer.strategy';
import { UsersService } from '../users/users.service';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    UsersModule,
    CoreModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.SECRET_KEY,
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
  providers: [AuthService, BearerStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
