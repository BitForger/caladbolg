/**
 * @author admin
 */
import { Message } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { CalvinCommand } from './commands/Calvin/Calvin.command';
import { HelloWorldCommand } from './commands/HelloWorld/HelloWorld.command';
import { Command } from './commands/Command';
import { AnimeCommand } from './commands/Anime/Anime.command';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SectionCommand } from './commands/Sections/Section.command';

type GenericCommand<T extends Command> = Command;

@Injectable()
export class CommandOrchestrator {
  private commands: Array<{
    command: string;
    handler: GenericCommand<any>;
  }> = [
    { command: 'hello', handler: this.helloWorldCommand },
    { command: 'calvin', handler: this.calvinCommand },
    { command: 'anime', handler: this.animeCommand },
    { command: 'section', handler: this.sectionCommand },
  ];

  constructor(
    private calvinCommand: CalvinCommand,
    private helloWorldCommand: HelloWorldCommand,
    private animeCommand: AnimeCommand,
    private sectionCommand: SectionCommand,
    @InjectPinoLogger() private logger: PinoLogger,
  ) {}

  public async exec(message: Message) {
    for (const c of this.commands) {
      if (message.content.startsWith(c.command)) {
        this.logger.info('Executing command', c.command);
        await c.handler.run(message);
      }
    }
  }
}
