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
import { Gender, Role } from '../entity/users.entity';

export class CreateUserDto {
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
    example: 'Password@123',
  })
  @IsStrongPassword()
  password: string;

  @AutoMap()
  @ApiProperty()
  otp_code: string;

  @AutoMap()
  @ApiProperty()
  otp_expiry: Date;

  @AutoMap()
  @ApiProperty({
    example: 'male',
  })
  @IsString()
  gender: Gender;

  @AutoMap()
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  // @ValidateNested()
  // @Type(() => UserDto)
  role?: Role;
}
