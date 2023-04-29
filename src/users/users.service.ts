import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { PrismaService } from '../core/orm/prisma.service';
import { RegisterDto } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
  private salt = 10;
  constructor(private readonly prismaService: PrismaService) {}

  async getUsersList(): Promise<User[]> {
    return this.prismaService.user.findMany({
      orderBy: {
        name: 'asc',
      },
      take: 5,
    });
  }

  async getUserById(userId: string) {
    return this.prismaService.user.findFirst({
      where: { id: Number(userId) },
    });
  }

  async createUserByManager(userData: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        city: userData.city,
        email: userData.email,
        age: userData.age,
        status: userData.status,
        avatar: userData.avatar,
        password: userData.password,
        dayOff: userData.dayOff,
      },
    });
  }

  async createUser(userData: RegisterDto): Promise<User> {
    const passwordHash = await this.hashPassword(userData.password);
    return this.prismaService.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: passwordHash,
      },
    });
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.salt);
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

  async findUserByEmail(userEmail: string) {
    return this.prismaService.user.findFirst({
      where: { email: userEmail },
    });
  }
}
