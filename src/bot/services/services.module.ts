import { Module } from '@nestjs/common';
import { MessagingService } from './messaging/messaging.service';

@Module({
  providers: [MessagingService]
})
export class ServicesModule {}
