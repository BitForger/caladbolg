import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BotModule } from './bot/bot.module';
import { LoggerModule } from 'nestjs-pino';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { Category, CategorySchema } from './bot/schema/category.schema';
import { DiscordModule } from 'nestjs-discord';

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
    /*MongooseModule.forRootAsync({
      useFactory(): MongooseModuleOptions {
        return {
          uri: process.env.MONGO_URI,
        };
      },
    }),
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),*/
    DiscordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      prefix: '>',
    }),
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
