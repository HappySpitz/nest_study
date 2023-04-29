import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import {
  editFileName,
  imageFileFilter,
} from 'src/core/file-upload/file.upload';
import { PetsService } from '../pets/pets.service';
import { CreatePetDto } from '../pets/dto/pets.dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => PetsService))
    private readonly petsService: PetsService,
  ) {}

  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    return res
      .status(HttpStatus.OK)
      .json(await this.usersService.getUsersList());
  }

  @ApiParam({ name: 'id', required: true })
  @Get('/:id')
  async getUserInfo(@Req() req: any, @Res() res: any, @Param('id') id: string) {
    return res
      .status(HttpStatus.OK)
      .json(await this.usersService.getUserById(id));
  }

  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: User,
  // })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      body.avatar = `public/${file.filename}`;
    }

    return res
      .status(HttpStatus.CREATED)
      .json(await this.usersService.createUserByManager(body));
  }

  @Delete('/:id')
  async deleteUser(@Req() req: any, @Res() res: any, @Param('id') id: string) {
    return res
      .status(HttpStatus.OK)
      .json(await this.usersService.deleteById(id));
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
      .json(await this.usersService.updateById(id, body));
  }

  @Post('/animals/:id')
  async addNewPet(
    @Req() req: any,
    @Res() res: any,
    @Body() body: CreatePetDto,
    @Param('id') id: string,
  ) {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json(`User with id: ${id} not found`);
    }

    return res
      .status(HttpStatus.OK)
      .json(await this.petsService.createAnimal(body, id));
  }
}
