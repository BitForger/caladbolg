/**
 * @author admin
 */
import {
  Client,
  DMChannel,
  Message,
  MessageActivity,
  MessageType,
  NewsChannel,
  TextChannel,
  User,
} from 'discord.js';

export interface SubCommand {
  name: string;
  handler(message: Message);
}

export abstract class Command {
  protected activity: MessageActivity;
  protected author: User;
  protected channel: TextChannel | DMChannel | NewsChannel;
  protected client: Client;
  protected type: MessageType;
  protected content: string;
  private _args: string[];
  subCommands?: SubCommand[];

  public set args(content) {
    content.shift();
    this._args = content;
  }

  public get args() {
    return this._args;
  }

  public processMessage(message: Message) {
    this.activity = message.activity;
    this.author = message.author;
    this.channel = message.channel;
    this.client = message.client;
    this.type = message.type;
    this.content = message.content;
    this.args = message.content.split(' ');
  }

  public async run(message: Message): Promise<void> {
    this.processMessage(message);
    await this.handle(message);
  }

  hasSubCommands(firstArg: string, subCommands = this.subCommands) {
    if (firstArg) {
      return subCommands.some(value => value.name === firstArg);
    }
    return false;
  }

  getSubCommand(name: string) {
    return this.subCommands.find(value => value.name === name);
  }

  async runSubCommand(name: string, message: Message) {
    return await this.getSubCommand(name).handler(message);
  }

  public abstract handle(message: Message): void;
  public abstract async handle(message: Message): Promise<void>;
}
