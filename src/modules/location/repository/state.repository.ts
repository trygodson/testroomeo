import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common';
import { EntityManager, Repository } from 'typeorm';
import { State } from '../entity/state.entity';

@Injectable({})
export class StateRepository extends AbstractRepository<State> {
  protected logger: Logger = new Logger(StateRepository.name);

  constructor(
    @InjectRepository(State) userRepository: Repository<State>,
    entityManger: EntityManager,
  ) {
    super(userRepository, entityManger);
  }
}
