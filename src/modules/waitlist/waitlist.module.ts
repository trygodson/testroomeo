import { Module } from '@nestjs/common';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';
import { DatabaseModule } from '../database';
import { WaitList } from './entity/waitlist.entity';
import { WaitlistRepository } from './waitlist.repository';
import { WaitListProfile } from './waitlist.mapping';
import { LoggerModule } from 'src/common';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports: [

    DatabaseModule,
    LoggerModule,
    DatabaseModule.forFeature([WaitList]),
    NotificationsModule
  ],
  controllers: [WaitlistController],
  providers: [WaitlistService, WaitlistRepository,NotificationsService, WaitListProfile],
})
export class WaitlistModule {}
