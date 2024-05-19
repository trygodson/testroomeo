import { MappingProfile, createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateWaitListDto } from './dtos/createWaitlist.dto';
import { WaitList } from './entity/waitlist.entity';
import { ReadWaitListDto } from './dtos/readWaitlist.dto';
export class WaitListProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      //For Writing Operations`
      createMap(mapper, CreateWaitListDto, WaitList);

      //For Reading Operations
      createMap(
        mapper,
        WaitList,
        ReadWaitListDto,

        // forMember((dest) => dest?.id, ignore()),
      );
    };
  }
}
