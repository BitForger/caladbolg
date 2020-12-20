/**
 * @author admin
 */
import { Command, SubCommandListItem } from '../Command';
import { CategoryChannel, Message, PermissionString } from 'discord.js';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../schema/category.schema';
import { Model } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreateSubcommand } from './subcommands/create.subcommand';
import { MessagingService } from '../../services/messaging/messaging.service';
import { JoinSubcommand } from './subcommands/join.subcommand';

export class SectionCommand extends Command {
  subCommands: SubCommandListItem[] = [
    {
      name: 'join',
      handler: this.joinSubCommand,
    },
    {
      name: 'create',
      handler: this.createSubCommand,
    },
  ];

  constructor(
    // @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectPinoLogger() private logger: PinoLogger,
    private createSubCommand: CreateSubcommand,
    private messagingService: MessagingService,
    private joinSubCommand: JoinSubcommand,
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

  /*async listSections(message) {
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
  }*/
}
