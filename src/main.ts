import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Client } from 'discord.js';
import { config } from 'dotenv';
import { CommandOrchestrator } from './bot/command.orchestrator';
import { LoggerService } from './shared/logger/logger.service';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  const commandClient = new Client({
    presence: {
      status: 'online',
      activity: {
        type: 'LISTENING',
        name: 'The wails of tortured souls',
      },
    },
  });

  const commandPrefix = '>';

  const orchestator: CommandOrchestrator = app.get<CommandOrchestrator>(
    CommandOrchestrator,
  );
  commandClient.on('ready', () => {
    console.log('Logged In');
  });

  commandClient.on('message', async msg => {
    if (msg.content.startsWith(commandPrefix)) {
      msg.content = msg.content.replace(commandPrefix, '');
      await orchestator.exec(msg);
    }
  });

  await commandClient.login(process.env.DISCORD_TOKEN);
  await app.listen(3000);
  console.log('Listening on port 3000');
}
bootstrap();
