/**
 * @author admin
 */

import { Command } from '../Command';
import { Message, MessageOptions } from 'discord.js';
import * as quotesData from './assets/quotes.json';
import { sample } from 'lodash';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CalvinCommand extends Command {
  async handle(message: Message) {
    this.processMessage(message);
    try {
      this.channel.startTyping();
      await this.channel.send({
        content: sample(quotesData),
      } as MessageOptions);
      this.channel.stopTyping();
    } catch (e) {
      console.error('Unable to run command', e);
    }
  }
}
