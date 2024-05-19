import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsNumber,
} from 'class-validator';

export class CreateStateDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  country_id: number;
}
