/**
 * @author admin
 */

import { Module } from '@nestjs/common';
import { CommandOrchestrator } from './command.orchestrator';
import { CalvinCommand } from './commands/Calvin/Calvin.command';
import { HelloWorldCommand } from './commands/HelloWorld/HelloWorld.command';
import { LoggerModule } from '../shared/logger/logger.module';

const providers = [CommandOrchestrator, CalvinCommand, HelloWorldCommand];

@Module({
  imports: [LoggerModule],
  providers,
  exports: [...providers],
})
export class BotModule {}
