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
  IsPhoneNumber,
} from 'class-validator';
import { Gender, Role } from '../entity/users.entity';

export class RegisterUserDto {
  @AutoMap()
  @ApiProperty({
    example: 'john',
  })
  @IsString()
  first_name: string;

  @AutoMap()
  @ApiProperty({
    example: 'doe',
  })
  @IsString()
  last_name: string;

  @AutoMap()
  @ApiProperty({
    example: 'email@email.com',
  })
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiProperty({
    example: '+2348018272824',
  })
  @IsPhoneNumber()
  phone: string;

  @AutoMap()
  @ApiProperty({
    example: 'Password@123',
  })
  @IsStrongPassword()
  password: string;
}
