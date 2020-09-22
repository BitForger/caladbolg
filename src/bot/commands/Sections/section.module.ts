/**
 * @author admin
 */

import { Module } from '@nestjs/common';
import { SectionCommand } from './Section.command';
import { CreateSubcommand } from './subcommands/create.subcommand';
import { BotServicesModule } from '../../services/bot-services.module';

const providers = [SectionCommand, CreateSubcommand];

@Module({
  imports: [BotServicesModule],
  providers,
  exports: providers,
})
export class SectionModule {}
