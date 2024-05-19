import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class ResetForgotPasswordDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  verification_token: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  password: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  otp_code: string;
}

export class ForgotPasswordDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  email: string;
}
