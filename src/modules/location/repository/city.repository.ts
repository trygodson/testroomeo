import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common';
import { EntityManager, Repository } from 'typeorm';
import { Country } from '../entity/country.entity';
import { City } from '../entity/city.entity';

@Injectable({})
export class CityRepository extends AbstractRepository<City> {
  protected logger: Logger = new Logger(CityRepository.name);

  constructor(
    @InjectRepository(City) userRepository: Repository<City>,
    entityManger: EntityManager,
  ) {
    super(userRepository, entityManger);
  }
}
