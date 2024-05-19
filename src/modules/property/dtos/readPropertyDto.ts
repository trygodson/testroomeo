import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsArray } from 'class-validator';
import { ReturnRate } from '../entity/property.entity';
import { PropertyImage } from '../entity/propertyImage.entity';
export class ReadPropertyDto {
  @AutoMap()
  @ApiProperty()
  id: number;

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
  // @Type(() => any)
  city: any;

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
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  propertyImage: [];
}
