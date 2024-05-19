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
} from 'class-validator';

export class ReadUserDto {
  @AutoMap()
  email: string;
}
