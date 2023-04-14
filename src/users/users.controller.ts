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
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreatePetDto } from '../pets/dto/pets.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    return res.status(200).json(await this.userService.getUsersList);
  }

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
    await this.userService.deleteUser(id);

    return res.sendStatus(204);
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
      .status(201)
      .json(await this.userService.updateUser(id, body));
  }

  @Post('/animals/:id')
  async addNewPet(
    @Req() req: any,
    @Body() body: CreatePetDto,
    @Res() res: any,
    @Param('id') id: string,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.addNewPet(id, body));
  }
}
