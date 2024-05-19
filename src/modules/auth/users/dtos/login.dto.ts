import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsArray,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
} from 'class-validator';

export class LoginDto {
  @AutoMap()
  @ApiProperty({
    example: 'trygodson@yopmail.com',
  })
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiProperty({
    example: 'Password@1234',
  })
  @IsStrongPassword()
  password: string;

  // @AutoMap()
  // @ApiProperty()
  // @IsOptional()
  // @IsNumber()
  // // @ValidateNested()
  // // @Type(() => UserDto)
  // user_type?: number;
}
