/**
 * @author admin
 */

import { Command } from '../Command';
import { Message, MessageOptions } from 'discord.js';
import * as quotesData from './assets/quotes.json';
import { sample } from 'lodash';
import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '../../../shared/logger/logger.service';

@Injectable()
export class CalvinCommand extends Command {
  @Inject() logger: LoggerService;

  async run(message: Message) {
    this.processMessage(message);
    try {
      this.channel.startTyping();
      await this.channel.send({
        content: sample(quotesData),
      } as MessageOptions);
      this.channel.stopTyping();
    } catch (e) {
      this.logger.error('Unable to run command', e);
    }
  }
}
