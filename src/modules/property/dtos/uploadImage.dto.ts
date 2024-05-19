import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsNumber } from 'class-validator';
import { ReturnRate } from '../entity/property.entity';
export class UploadImageDto {
  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image_path: string[];

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  property_id: string;
}
