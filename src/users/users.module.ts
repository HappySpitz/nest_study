import { forwardRef, Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PetsModule } from '../pets/pets.module';
import { PetsService } from '../pets/pets.service';
import { PrismaModule } from '../core/orm/prisma.module';
import { PrismaService } from '../core/orm/prisma.service';

@Module({
  imports: [PrismaModule, forwardRef(() => PetsModule)],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, PetsService],
})
export class UsersModule {}
