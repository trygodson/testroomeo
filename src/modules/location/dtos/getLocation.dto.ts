import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class GetCountryDto {
  @AutoMap()
  @ApiProperty({
    description: 'pass country_id to get a country, ignore to get all country',
  })
  @IsNumber()
  @IsOptional()
  country_id: number;
}
export class GetStateDto {
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  state_id: number;
}
export class GetCityDto {
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  city_id: number;
}
