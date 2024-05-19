import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common';
import { EntityManager, Repository } from 'typeorm';
import { Property } from './entity/property.entity';

@Injectable({})
export class PropertyRepository extends AbstractRepository<Property> {
  protected logger: Logger = new Logger(PropertyRepository.name);

  constructor(
    @InjectRepository(Property) propertyRepository: Repository<Property>,
    entityManger: EntityManager,
  ) {
    super(propertyRepository, entityManger);
  }
}
