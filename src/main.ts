import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger } from 'nestjs-pino';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: undefined,
  });

  app.useLogger(app.get(Logger));

  await app.listen(3000);
  console.log('Listening on port 3000');
}
bootstrap();
