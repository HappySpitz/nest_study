import { Injectable, Req } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { CreatePetDto } from '../pets/dto/pets.dto';

@Injectable()
export class UsersService {
  private users: any = [
    {
      id: '2023-04-13T12:41:28.644Z',
      name: 'Arnold',
      age: 23,
      email: 'anna@gmail.com',
      city: 'Kyiv',
    },
    {
      id: '2023-04-13T12:43:48.974Z',
      name: 'Anya',
      age: 32,
      email: 'anna@gmail.com',
      city: 'Kyiv',
    },
    {
      id: '2023-04-13T12:44:41.526Z',
      name: 'Roman',
      age: 3,
      email: 'anna@gmail.com',
      city: 'Kyiv',
    },
    {
      id: '2023-04-13T12:44:09.799Z',
      name: 'Leonid',
      age: 27,
      email: 'leonid@gmail.com',
      city: 'Kyiv',
    },
  ];
  private pets: any = [];

  async getUsersList() {
    return this.users;
  }

  async createUser(userData: CreateUserDto) {
    const { name, age, email, status, city } = userData;

    const newUser = {
      id: new Date(),
      name,
      age,
      email,
      status,
      city,
    };

    await this.users.push(newUser);

    return newUser;
  }

  async updateUser(id: string, userData: UpdateUserDto) {
    const { name, age, email, status, city } = userData;

    const user = this.users.find(id);
    await user.update(name, age, email, status, city);

    return user;
  }

  async deleteUser(id: string) {
    const user = this.users.find(id);

    await user.delete();
  }

  async addNewPet(id: string, petData: CreatePetDto) {
    const user = this.users.find(id);
    // await user.update(this.pets: petData);

    return user;
  }
}
