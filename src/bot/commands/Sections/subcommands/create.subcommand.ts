/**
 * @author admin
 */
import { SubCommand } from '../../SubCommand';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../../schema/category.schema';
import { Model } from 'mongoose';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateSubcommand extends SubCommand {
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

      const categoryObject = new this.categoryModel({
        guild: this.guild.id,
        guildName: this.guild.name,
        role: role.id,
        category: cat.id,
        categoryName: cat.name,
      });

      await categoryObject.save();
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
