import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, DatabaseConfig } from './config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { WaitlistModule } from './modules/waitlist/waitlist.module';
import { PropertyModule } from './modules/property/property.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, DatabaseConfig],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
    LoggerModule,
    NotificationsModule,
    WaitlistModule,
    PropertyModule,
    LocationModule,
    WalletModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
