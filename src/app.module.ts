import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BotModule } from './bot/bot.module';
import { LoggerModule } from 'nestjs-pino';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './bot/schema/category.schema';

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
    MongooseModule.forRootAsync({
      useFactory() {
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
    ]),
  ],
  controllers: [AppController],
  providers: [],
  exports: [MongooseModule],
})
export class AppModule {}
