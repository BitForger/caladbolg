/**
 * @author admin
 */

import { Module } from '@nestjs/common';
import { SectionCommand } from './Section.command';
import { CreateSubcommand } from './subcommands/create.subcommand';

const providers = [SectionCommand, CreateSubcommand];

@Module({
  providers,
  exports: providers,
})
export class SectionModule {}
