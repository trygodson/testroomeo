import { MappingProfile, createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreatePropertyDto } from './dtos/createPropertyDto';
import { Property } from './entity/property.entity';
import { ReadPropertyDto } from './dtos/readPropertyDto';
export class PropertyProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      //For Writing Operations`
      createMap(mapper, CreatePropertyDto, Property);

      //For Reading Operations
      createMap(
        mapper,
        Property,
        ReadPropertyDto,

        // forMember((dest) => dest?.id, ignore()),
      );
    };
  }
}
