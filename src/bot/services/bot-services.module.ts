import { Module } from '@nestjs/common';
import { MessagingService } from './messaging/messaging.service';

@Module({
  providers: [MessagingService],
  exports: [MessagingService],
})
export class BotServicesModule {}
