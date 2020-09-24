/**
 * @author admin
 */
import { SubCommand } from '../../SubCommand';
import { CategoryChannel, Message } from 'discord.js';
import { MessagingService } from '../../../services/messaging/messaging.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JoinSubcommand extends SubCommand {
  constructor(
    private readonly messagingService: MessagingService,
    @InjectPinoLogger() private logger: PinoLogger,
  ) {
    super();
  }

  async handle(message: Message): Promise<void> {
    const categoryToJoin = this.args?.join(' ').toLowerCase();
    const categories = this.guild.channels.cache.filter(
      value => value instanceof CategoryChannel || value.type === 'category',
    );
    const category = categories.find(
      value => value.name.toLowerCase() === categoryToJoin,
    );
    if (category) {
      try {
        const role = (await this.guild.roles.fetch()).cache.find(
          value => value.name === category.name,
        );
        await this.guild.member(this.author).roles.add(role);
        await this.messagingService.sendResult(message.channel, {
          name: 'Result',
          value: `Successfully added to ${category.name}`,
          inline: false,
        });
      } catch (e) {
        this.logger.error(e);
        await this.messagingService.sendResult(message.channel, {
          name: 'Error',
          value: e,
          inline: false,
        });
      }
    }
  }
}
