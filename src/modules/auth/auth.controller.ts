import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoacalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users/users.service';
import { RefreshTokenDto } from './dtos/refresh_token.dto';
import { User, User as UserEntity } from './users/entity/users.entity';
import { CurrentUser } from './users/decorators/current-user.decorator';
import { LoginDto } from './users/dtos/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('refresh_token')
  async refreshToken(
    @Body() payload: RefreshTokenDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.generateAccessTokenFromRefreshToken(
      payload.refresh_token,
      response,
    );
  }
  @ApiBody({ type: LoginDto })
  @UseGuards(LoacalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserEntity,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user);
  }
}
