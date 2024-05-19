import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common';
import { EntityManager, Repository } from 'typeorm';
import { WaitList } from './entity/waitlist.entity';

@Injectable({})
export class WaitlistRepository extends AbstractRepository<WaitList> {
  protected logger: Logger = new Logger(WaitlistRepository.name);

  constructor(
    @InjectRepository(WaitList) userRepository: Repository<WaitList>,
    entityManger: EntityManager,
  ) {
    super(userRepository, entityManger);
  }
}
