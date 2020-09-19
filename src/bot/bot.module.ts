/**
 * @author admin
 */

import { Module } from '@nestjs/common';
import { CommandOrchestrator } from './command.orchestrator';
import { CalvinCommand } from './commands/Calvin/Calvin.command';
import { HelloWorldCommand } from './commands/HelloWorld/HelloWorld.command';
import { DiscordClient } from './discord.client';
import { AnimeCommand } from './commands/Anime/Anime.command';

const providers = [
  CommandOrchestrator,
  CalvinCommand,
  HelloWorldCommand,
  DiscordClient,
  AnimeCommand,
];

@Module({
  imports: [],
  providers,
  exports: [...providers],
})
export class BotModule {}
