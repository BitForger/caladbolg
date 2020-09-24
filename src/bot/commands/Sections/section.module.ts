/**
 * @author admin
 */

import { Module } from '@nestjs/common';
import { SectionCommand } from './Section.command';
import { CreateSubcommand } from './subcommands/create.subcommand';
import { BotServicesModule } from '../../services/bot-services.module';
import { JoinSubcommand } from './subcommands/join.subcommand';

const providers = [SectionCommand, CreateSubcommand, JoinSubcommand];

@Module({
  imports: [BotServicesModule],
  providers,
  exports: providers,
})
export class SectionModule {}
