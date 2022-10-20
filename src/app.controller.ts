import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Authenticate user' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiBody({
    schema: {
      example: { email: 'teste@gmail.com', password: 'teste123' },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('api/v1/auth/login')
  async login(@Req() { user }: Request) {
    return this.authService.login(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get profile information from user' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Get('api/v1/profile')
  getProfile(@Req() { user }: Request) {
    return user;
  }
}
