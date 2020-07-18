import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BotModule } from './bot/bot.module';
import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [LoggerModule, BotModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
