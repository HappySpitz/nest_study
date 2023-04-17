import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
// import { User } from '@prisma/client';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import {
  // ApiCreatedResponse,
  ApiParam,
  // ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePetDto } from '../pets/dto/pets.dto';
import { User } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsersList(@Req() req: any, @Res() res: any): Promise<User[]> {
    return res.status(HttpStatus.OK).json(await this.userService.getUsersList);
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/:id')
  async getUserInfo(@Req() req: any, @Res() res: any, @Param('id') id: string) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(id));
  }

  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: User,
  // })
  @Post()
  async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }

  @Delete('/:id')
  async deleteUser(@Req() req: any, @Res() res: any, @Param('id') id: string) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.deleteById(id));
  }

  @ApiParam({ name: 'id', required: true })
  @Patch('/:id')
  async updateUser(
    @Req() req: any,
    @Body() body: UpdateUserDto,
    @Res() res: any,
    @Param('id') id: string,
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.updateById(id, body));
  }
}
