import {
  MappingProfile,
  createMap,
  forMember,
  Mapper,
  mapFrom,
  mapWith,
  ignore,
  beforeMap,
  afterMap,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entity/users.entity';
import { ReadUserDto } from '../dtos/read-user.dto';
import { LoginDto } from '../dtos/login.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { RegisterUserDto } from '../dtos/registerUser.dto';

export class UserMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      //For Writing Operations`
      createMap(mapper, LoginDto, User);
      createMap(mapper, CreateUserDto, User);
      createMap(
        mapper,
        UpdateUserDto,
        User,
        forMember((dest) => dest.refreshTokens, ignore()),
      );

      // Register User
      createMap(mapper, RegisterUserDto, User);

      //For Reading Operations
      createMap(
        mapper,
        User,
        ReadUserDto,

        // forMember((dest) => dest?.id, ignore()),
      );
    };
  }
}
