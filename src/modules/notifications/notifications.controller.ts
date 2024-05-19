import {
  Body,
  Controller,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
// import { NotifyEmailDto } from './dto/notify-email.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // @UsePipes(new ValidationPipe())
  // async notifyEmail(@Body() data: { email: string; text: string }) {
  //   this.notificationsService.notifyEmail(data);
  // }
}
