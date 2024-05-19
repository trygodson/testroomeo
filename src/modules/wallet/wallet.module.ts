import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { DatabaseModule } from '../database';
import { Wallet } from './entity/wallet.entity';
import { WalletRepository } from './wallet.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([Wallet])],
  providers: [WalletService, WalletRepository],
  controllers: [
    // WalletController
  ],

  exports: [WalletService],
})
export class WalletModule {}
