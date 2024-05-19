import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class GetUserDto {
  @ApiProperty({
    example: '1',
  })
  @IsNotEmpty()
  id: number;
}
