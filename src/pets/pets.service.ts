import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Pets } from '@prisma/client';

import { PrismaService } from '../core/orm/prisma.service';
import { CreatePetDto } from './dto/pets.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PetsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async getPetsList(): Promise<Pets[]> {
    return this.prismaService.pets.findMany();
  }

  async createAnimal(data: CreatePetDto, userId: string): Promise<Pets> {
    const user = await this.checkUser(userId);

    return this.prismaService.pets.create({
      data: {
        name: data.name,
        animal: data.animal,
        age: data.age,
        status: data.status,
        ownerId: user.id,
        // image: data.image,
        // logo: data.logo,
      },
    });
  }

  async checkUser(userId: string) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      return null;
    }

    return user;
  }

  async updateAnimal(data: any): Promise<Pets> {
    return this.prismaService.pets.create({
      data: {
        name: data.name,
        animal: data.animal,
        age: data.age,
        status: data.status,
        ownerId: data.ownerId,
        // image: data.image,
        // logo: data.logo,
      },
    });
  }
}
