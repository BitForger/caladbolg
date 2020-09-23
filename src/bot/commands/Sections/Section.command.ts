/**
 * @author admin
 */
import { Command, SubCommandList } from '../Command';
import { CategoryChannel, Message, PermissionString } from 'discord.js';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../schema/category.schema';
import { Model } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreateSubcommand } from './subcommands/create.subcommand';
import { MessagingService } from '../../services/messaging/messaging.service';

export class SectionCommand extends Command {
  subCommands: SubCommandList[] = [
    {
      name: 'join',
      handler: this.joinSection.bind(this),
    },
    {
      name: 'create',
      handler: this.createSubCommand,
    },
    {
      name: 'list',
      handler: this.listSections.bind(this),
    },
  ];

  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectPinoLogger() private logger: PinoLogger,
    private createSubCommand: CreateSubcommand,
    private messagingService: MessagingService,
  ) {
    super();
  }

  async handle(message: Message) {
    if (this.hasSubCommands(this.args[0])) {
      try {
        await this.runSubCommand(this.args.shift(), message);
      } catch (e) {
        await this.messagingService.sendResult(message.channel, {
          name: 'Error',
          value: e,
          inline: false,
        });
      }
    }
  }

  async joinSection(message: Message) {
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

  async listSections(message) {
    const createdCategories = await this.categoryModel
      .find({ guild: this.guild.id })
      .lean()
      .exec();
    const categories = this.guild.channels.cache.filter(
      value =>
        value.type === 'category' &&
        createdCategories.some(value1 => value.id === value1.category),
    );
    await this.messagingService.sendResult(
      message.channel,
      ...categories.map(value => {
        return {
          name: 'Name',
          value: value.name,
          inline: false,
        };
      }),
    );
  }
}