import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BotModule } from './bot/bot.module';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    BotModule,
    LoggerModule.forRootAsync({
      useFactory() {
        return {
          pinoHttp: {
            prettyPrint: process.env.NODE_ENV === 'development',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
