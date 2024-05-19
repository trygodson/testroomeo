import { Injectable, Logger } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { RefreshToken } from './entity/refreshtoken.entity';

@Injectable({})
export class RefreshTokenReposiotry extends AbstractRepository<RefreshToken> {
  protected logger: Logger = new Logger(RefreshTokenReposiotry.name);

  constructor(
    @InjectRepository(RefreshToken) refreshRepo: Repository<RefreshToken>,
    entityManger: EntityManager,
  ) {
    super(refreshRepo, entityManger);
  }

  // constructor(@InjectModel(User.name) userModel: Model<User>) {
  //   super(userModel);
  // }
}
