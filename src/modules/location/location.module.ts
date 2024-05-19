import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { DatabaseModule } from '../database';
import { City } from './entity/city.entity';
import { Country } from './entity/country.entity';
import { State } from './entity/state.entity';
import {
  CityRepository,
  CountryRepository,
  StateRepository,
} from './repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([City, Country, State])],
  providers: [
    LocationService,
    CityRepository,
    StateRepository,
    CountryRepository,
  ],

  controllers: [LocationController],
  exports: [CityRepository],
})
export class LocationModule {}
