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
      name: 'debug',
      handler(message: Message) {
        console.log(
          message.guild.roles.cache.filter(value => value.managed === true),
        );
      },
    },
  ];
  requiredPermissions = [
    'MANAGE_CHANNELS',
    'MANAGE_ROLES',
  ] as PermissionString[];

  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectPinoLogger() private logger: PinoLogger,
    private createSubCommand: CreateSubcommand,
  ) {
    super();
  }

  async handle(message: Message) {
    if (this.hasSubCommands(this.args[0])) {
      await this.runSubCommand(this.args.shift(), message);
    }
  }

  joinSection(message: Message) {
    const categoryToJoin = this.args?.join(' ').toLowerCase();
    const categories = this.guild.channels.cache.filter(
      value => value instanceof CategoryChannel || value.type === 'category',
    );
    const category = categories.find(
      value => value.name.toLowerCase() === categoryToJoin,
    );
    if (category) {
    }
  }
}
