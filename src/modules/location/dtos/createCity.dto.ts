import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCityDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city_name: string;

  @AutoMap()
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  state_id: number;
}
