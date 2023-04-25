import {Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
// import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
