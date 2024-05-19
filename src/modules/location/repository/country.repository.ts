import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common';
import { EntityManager, Repository } from 'typeorm';
import { Country } from '../entity/country.entity';

@Injectable({})
export class CountryRepository extends AbstractRepository<Country> {
  protected logger: Logger = new Logger(CountryRepository.name);

  constructor(
    @InjectRepository(Country) userRepository: Repository<Country>,
    entityManger: EntityManager,
  ) {
    super(userRepository, entityManger);
  }
}
