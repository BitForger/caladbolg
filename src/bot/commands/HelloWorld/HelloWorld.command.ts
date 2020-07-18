/**
 * @author admin
 */
import { Command } from '../Command';
import { Message } from 'discord.js';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class HelloWorldCommand extends Command {
  async run(message: Message) {
    this.processMessage(message);
    await this.channel.send({
      content: `
const str = '${this.args.join(' ')}';
export function func() {
    console.log('hello', str);
}`,
      code: 'js',
    });
  }
}
