import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class ReadWaitListDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @AutoMap()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @AutoMap()
  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
