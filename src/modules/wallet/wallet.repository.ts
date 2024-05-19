import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common';
import { EntityManager, Repository } from 'typeorm';
import { Wallet } from './entity/wallet.entity';

@Injectable({})
export class WalletRepository extends AbstractRepository<Wallet> {
  protected logger: Logger = new Logger(WalletRepository.name);

  constructor(
    @InjectRepository(Wallet) userRepository: Repository<Wallet>,
    entityManger: EntityManager,
  ) {
    super(userRepository, entityManger);
  }
}
