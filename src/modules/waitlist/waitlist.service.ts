import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { WaitlistRepository } from './waitlist.repository';
import { WaitList } from './entity/waitlist.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { CreateWaitListDto } from './dtos/createWaitlist.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class WaitlistService {
  constructor(
    private readonly waitlistRepository: WaitlistRepository,
    private readonly notificationsService: NotificationsService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async waitList(data: CreateWaitListDto) {
    try {
      await this.validateWaitListedUser(data);
      const entity = this.mapper.map({ ...data }, CreateWaitListDto, WaitList);

      // await this.notificationsService.notifyEmailSubscription({
      //   email: data.email,
      //   name: data.full_name,
      // });
      let dd = await this.mapper.mapAsync(
        await this.waitlistRepository.create(entity),
        CreateWaitListDto,
        WaitList,
      );

      return {
        success: true,
        message: `${data.email} Successfully Added to Waitlist`,
      };
    } catch (error) {
      throw error;
    }
  }

  private async validateWaitListedUser(createUser: CreateWaitListDto) {
    const res = await this.waitlistRepository.find({
      email: createUser.email,
    });
    const resPhone = await this.waitlistRepository.find({
      phone: createUser.phone,
    });

    if (res) {
      throw new NotFoundException('Email Already Exists');
    }

    if (resPhone) {
      throw new NotFoundException('Phone Number Already Exists');
    }
  }
}
