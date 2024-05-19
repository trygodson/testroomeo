import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPhoneNumber,
} from 'class-validator';

export class CreateCountryDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country_name: string;
}
