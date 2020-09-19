/**
 * @author admin
 */

import { Injectable } from '@nestjs/common';
import { Command } from '../Command';
import { Message } from 'discord.js';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AnimeCommand extends Command {
  private readonly animeRole = '755797385090695248';
  constructor(@InjectPinoLogger() private readonly logger: PinoLogger) {
    super();
  }

  subCommands = [
    {
      name: 'join',
      handler: this.joinSectionHandler.bind(this),
    },
    {
      name: 'leave',
      handler: this.leaveHandler.bind(this),
    },
  ];

  async handle(message: Message): Promise<void> {
    if (this.hasSubCommands(this.args[0])) {
      const subCommand = this.args[0];
      await this.runSubCommand(subCommand, message);
    }
  }

  private async joinSectionHandler(message: Message) {
    try {
      const animeRole = await message.guild.roles.fetch(this.animeRole);
      await message.guild.member(message.author).roles.add(animeRole);
      await message.channel.send({
        embed: {
          fields: [{ name: 'Result', value: 'Added role successfully' }],
        },
      });
    } catch (e) {
      this.logger.error(e);
      await message.channel.send({
        content: 'Unable to join channel',
        embed: {
          fields: [
            {
              name: 'Error',
              value: e,
            },
          ],
        },
      });
    }
  }

  private async leaveHandler(message: Message) {
    try {
      const role = await message.guild.roles.fetch(this.animeRole);
      await message.guild.member(message.author).roles.remove(role);
      await message.channel.send({
        embed: {
          fields: [{ name: 'Result', value: 'Left Successfully' }],
        },
      });
    } catch (e) {
      this.logger.error(e);
      await message.channel.send({
        embed: {
          fields: [
            {
              name: 'Result',
              value: 'Unable to leave section',
            },
            {
              name: 'Error',
              value: e,
            },
          ],
        },
      });
    }
  }
}
