import { Injectable, Req } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { CreatePetDto } from '../pets/dto/pets.dto';
import { PrismaService } from '../core/orm/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsersList(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  async getUserById(userId: string) {
    return this.prismaService.user.findFirst({
      where: { id: Number(userId) },
      select: {
        name: true,
        city: true,
        age: true,
      },
    });
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        city: userData.city,
        email: userData.email,
        age: userData.age,
        status: userData.status,
      },
    });
  }

  async updateById(userId: string, userData: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id: Number(userId) },
      data: {
        name: userData.name,
        city: userData.city,
        email: userData.email,
        age: userData.age,
        status: userData.status,
      },
    });
  }

  async deleteById(userId: string) {
    return this.prismaService.user.delete({ where: { id: Number(userId) } });
  }
}
