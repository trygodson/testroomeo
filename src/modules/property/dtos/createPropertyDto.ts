import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { ReturnRate } from '../entity/property.entity';
import { Type } from 'class-transformer';
class PropertyImage {
  @AutoMap()
  @ApiProperty({ type: 'string', description: 'Image path' })
  @IsString()
  @IsNotEmpty()
  image_path: string;
}

export class CreatePropertyDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @AutoMap()
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  city_id: number;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currency: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  total_fraction: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sold_fraction: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price_per_fraction: string;

  @AutoMap()
  @ApiProperty()
  @IsEnum(ReturnRate)
  @IsNotEmpty()
  returns_rate: ReturnRate;

  @AutoMap()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @ApiProperty({ type: PropertyImage, isArray: true })
  @ValidateNested({ each: true })
  @Type(() => PropertyImage)
  propertyImage: PropertyImage[];
}
