import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { PrismaModule } from './core/orm/prisma.module';
import { PrismaService } from './core/orm/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { PassportWrapperModule } from './auth/passport.wrapper.module';
import { BearerStrategy } from './auth/bearer.strategy';
import { JwtModule } from '@nestjs/jwt';
import { CoreModule } from './core/core.module';

@Module({
  controllers: [AppController, UsersController, AuthController],
  imports: [
    UsersModule,
    PetsModule,
    PrismaModule,
    AuthModule,
    PassportWrapperModule,
    CoreModule,
    JwtModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  providers: [AppService, UsersService, PrismaService, BearerStrategy],
})
export class AppModule {}
