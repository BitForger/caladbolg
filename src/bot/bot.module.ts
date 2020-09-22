/**
 * @author admin
 */

import { Global, Module } from '@nestjs/common';
import { CommandOrchestrator } from './command.orchestrator';
import { CalvinCommand } from './commands/Calvin/Calvin.command';
import { HelloWorldCommand } from './commands/HelloWorld/HelloWorld.command';
import { DiscordClient } from './discord.client';
import { AnimeCommand } from './commands/Anime/Anime.command';
import { SectionModule } from './commands/Sections/section.module';
import { BotServicesModule } from './services/bot-services.module';

const providers = [
  CommandOrchestrator,
  CalvinCommand,
  HelloWorldCommand,
  DiscordClient,
  AnimeCommand,
];

@Global()
@Module({
  imports: [SectionModule, BotServicesModule],
  providers,
  exports: [...providers],
})
export class BotModule {}
