import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common';
import { EntityManager, Repository } from 'typeorm';
import { PropertyImage } from './entity/propertyImage.entity';

@Injectable({})
export class PropertyImageRepository extends AbstractRepository<PropertyImage> {
  protected logger: Logger = new Logger(PropertyImageRepository.name);

  constructor(
    @InjectRepository(PropertyImage) userRepository: Repository<PropertyImage>,
    entityManger: EntityManager,
  ) {
    super(userRepository, entityManger);
  }
}
