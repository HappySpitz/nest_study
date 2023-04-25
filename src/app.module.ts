import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { PetsService } from './pets/pets.service';
import { PrismaModule } from './core/orm/prisma.module';
import { PrismaService } from './core/orm/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, PetsModule, PrismaModule, AuthModule, JwtModule],
  controllers: [AppController, UsersController],
  providers: [
    AppService,
    UsersService,
    PrismaService,
    PetsService,
    AuthService,
  ],
})
export class AppModule {}
