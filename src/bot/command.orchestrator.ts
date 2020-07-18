/**
 * @author admin
 */
import { Message } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { CalvinCommand } from './commands/Calvin/Calvin.command';
import { HelloWorldCommand } from './commands/HelloWorld/HelloWorld.command';
import { Command } from './commands/Command';

type GenericCommand<T extends Command> = Command;

@Injectable()
export class CommandOrchestrator {
  private commands: Array<{
    command: string;
    handler: GenericCommand<any>;
  }> = [
    { command: 'hello', handler: this.helloWorldCommand },
    { command: 'calvin', handler: this.calvinCommand },
  ];

  constructor(
    private calvinCommand: CalvinCommand,
    private helloWorldCommand: HelloWorldCommand,
  ) {}

  public async exec(message: Message) {
    for (const command of this.commands) {
      if (message.content.startsWith(command.command)) {
        await command.handler.run(message);
      }
    }
  }
}
