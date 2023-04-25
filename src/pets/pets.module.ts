import { forwardRef, Module } from '@nestjs/common';

import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PrismaModule } from '../core/orm/prisma.module';
import { PrismaService } from '../core/orm/prisma.service';

@Module({
  imports: [forwardRef(() => UsersModule), PrismaModule],
  providers: [PetsService, UsersService, PrismaService],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}
