import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entity/users.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto } from './dtos/login.dto';
import { VerifyOtpDto } from './dtos/verifyOtp.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Response } from 'express';
import { RegisterUserDto } from './dtos/registerUser.dto';
import {
  ForgotPasswordDto,
  ResetForgotPasswordDto,
} from './dtos/resetForgotPassword.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiCreatedResponse({
    type: User,
  })
  @Post('register_user')
  async createUser(@Body() createUser: RegisterUserDto) {
    return this.userService.create(createUser);
  }
  @Post('user_verify_otp')
  async userVerifyOtp(@Body() token: VerifyOtpDto) {
    return this.userService.verifyUserOtp(token);
  }
  @Post('forgot_password')
  async forgotPassword(@Body() token: ForgotPasswordDto) {
    return this.userService.forgotPassword(token.email);
  }
  @Post('reset_forgot_password')
  async resetForgotPassword(@Body() token: ResetForgotPasswordDto) {
    return this.userService.resetForgotPassword(token);
  }

  // @ApiBearerAuth()
  @Patch('update_user')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Body() body: UpdateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.updateUser(user, body, response);
  }

  @ApiCreatedResponse({
    type: User,
  })
  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
