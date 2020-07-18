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

export abstract class Command {
  protected activity: MessageActivity;
  protected author: User;
  protected channel: TextChannel | DMChannel | NewsChannel;
  protected client: Client;
  protected type: MessageType;
  protected content: string;
  private _args: string[];

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

  public abstract async run(message: Message);
}
