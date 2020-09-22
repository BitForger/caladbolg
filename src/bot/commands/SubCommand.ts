/**
 * @author admin
 */

import {
  Client,
  DMChannel,
  Guild,
  Message,
  MessageType,
  NewsChannel,
  PermissionString,
  TextChannel,
  User,
} from 'discord.js';

export abstract class SubCommand {
  requiredPermissions: PermissionString[] = [];
  author: User;
  channel: TextChannel | DMChannel | NewsChannel;
  client: Client;
  content: string;
  guild: Guild;
  type: MessageType;
  private _args: string[];

  public set args(content) {
    content = content.slice(2);
    this._args = content;
  }

  public get args() {
    return this._args;
  }

  async exec(message: Message): Promise<void> {
    this.processMessage(message);
    await this.verifyPermissions();
    await this.handle(message);
  }

  abstract async handle(message: Message): Promise<void>;

  private processMessage(message: Message) {
    this.args = message.content.split(' ');
    this.author = message.author;
    this.channel = message.channel;
    this.client = message.client;
    this.content = message.content;
    this.guild = message.guild;
    this.type = message.type;
  }

  private async verifyPermissions() {
    if (this.requiredPermissions.length > 0) {
      const userRoles = this.guild.member(this.author).roles;
      if (!userRoles.highest.permissions.any(this.requiredPermissions)) {
        throw new Error('Missing permissions');
      }
    }
  }
}
