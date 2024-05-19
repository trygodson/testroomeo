import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from 'src/common';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { RegisterUserDto } from './dtos/registerUser.dto';

@Injectable({})
export class UsersRepository extends AbstractRepository<User> {
  protected logger: Logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(User) userRepository: Repository<User>,
    entityManger: EntityManager,
  ) {
    super(userRepository, entityManger);
  }

  async signUp(createUser: RegisterUserDto) {
    const dd = this.queryBuidler('user');

    const users = (await dd)
      .select('email')
      .where('user.email LIKE :email', { email: createUser.email });

    return await users.getCount();
  }
}
