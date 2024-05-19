import { Body, Controller, Post } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { CreateWaitListDto } from './dtos/createWaitlist.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WaitList')
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post()
  async waitlist(@Body() payload: CreateWaitListDto) {
    return this.waitlistService.waitList(payload);
  }
}
