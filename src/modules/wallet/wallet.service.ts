import { Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { Wallet } from './entity/wallet.entity';
import { User } from '../auth/users/entity/users.entity';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
  ) // @InjectMapper() private readonly mapper: Mapper,
  {}

  async createWallet(user: User) {
    try {
      const wallet = new Wallet({
        user: user,
      });

      const res = await this.walletRepository.create(wallet);

      if (res) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}
