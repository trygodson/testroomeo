import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsString, IsDateString, IsEnum } from 'class-validator';
import { Gender, Role } from '../entity/users.entity';

export class UpdateUserDto {
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
    example: 'male',
  })
  @IsEnum(Gender)
  gender: Gender;

  @AutoMap()
  @ApiProperty({
    example: '1990-01-01',
  })
  @IsDateString()
  dob: Date;
}
