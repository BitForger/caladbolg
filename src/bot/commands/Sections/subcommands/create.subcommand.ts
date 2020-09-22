/**
 * @author admin
 */
import { SubCommand } from '../../SubCommand';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../../schema/category.schema';
import { Model } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';
import { CategoryChannel, PermissionString, Role } from 'discord.js';

@Injectable()
export class CreateSubcommand extends SubCommand {
  requiredPermissions = [
    'MANAGE_ROLES',
    'MANAGE_CHANNELS',
  ] as PermissionString[];

  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectPinoLogger() private logger: PinoLogger,
  ) {
    super();
  }

  async handle(message) {
    const category = this.args?.join(' ');
    try {
      const role = await this.createRole(category);
      const cat = await this.createSection(category, role);

      await this.saveToDb(role, cat);

      await this.channel.send({
        embed: {
          fields: [
            {
              name: 'Success',
              value: 'Created category and role successfully',
            },
          ],
        },
      });
    } catch (e) {
      this.logger.error(e);
      await message.channel.send({
        embed: {
          fields: [
            {
              name: 'Result',
              value: 'Unable to create section',
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

  private async saveToDb(role: Role, cat: CategoryChannel) {
    const categoryObject = new this.categoryModel({
      guild: this.guild.id,
      guildName: this.guild.name,
      role: role.id,
      category: cat.id,
      categoryName: cat.name,
    });

    await categoryObject.save();
  }

  private async createSection(category: string, role: Role) {
    const cat = await this.guild.channels.create(category, {
      type: 'category',
      permissionOverwrites: [
        {
          id: this.guild.roles.everyone.id,
          type: 'role',
          deny: ['VIEW_CHANNEL', 'CONNECT'],
        },
        {
          id: role.id,
          type: 'role',
          allow: ['VIEW_CHANNEL', 'CONNECT'],
        },
      ],
    });
    return cat;
  }

  private async createRole(category: string) {
    const role = await this.guild.roles.create({
      data: {
        name: category,
      },
    });
    await role.setPosition(5);
    return role;
  }
}
