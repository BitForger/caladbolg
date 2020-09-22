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
  TextChannel,
  User,
} from 'discord.js';

export abstract class SubCommand {
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
}
