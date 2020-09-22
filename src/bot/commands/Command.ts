/**
 * @author admin
 */
import {
  Client,
  DMChannel,
  Guild,
  Message,
  MessageActivity,
  MessageType,
  NewsChannel,
  PermissionString,
  TextChannel,
  User,
} from 'discord.js';
import { SubCommand } from './SubCommand';
import { Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export interface SubCommandList {
  name: string;
  handler: (message: Message) => Promise<void> | SubCommand;
}

export abstract class Command {
  protected activity: MessageActivity;
  protected author: User;
  protected channel: TextChannel | DMChannel | NewsChannel;
  protected client: Client;
  protected type: MessageType;
  protected content: string;
  protected guild: Guild;
  private _args: string[];
  subCommands?: SubCommandList[];
  requiredPermissions: PermissionString[] = [];

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
    this.guild = message.guild;
    this.args = message.content.split(' ');
  }

  public async run(message: Message): Promise<void> {
    this.processMessage(message);
    await this.verifyPermissions();
    await this.handle(message);
  }

  hasSubCommands(firstArg: string, subCommands = this.subCommands) {
    if (firstArg) {
      return subCommands.some(value => value.name === firstArg);
    }
    return false;
  }

  getSubCommand(name: string) {
    if (!this.subCommands.length) {
      throw new Error('No subcommands defined');
    }
    return this.subCommands.find(value => value.name === name);
  }

  async runSubCommand(name: string, message: Message) {
    const subCommandObj = await this.getSubCommand(name);
    if (subCommandObj.handler instanceof SubCommand) {
      return await subCommandObj.handler.exec(message);
    }
    return await subCommandObj.handler(message);
  }

  private async verifyPermissions() {
    if (this.requiredPermissions.length > 0) {
      const userRoles = this.guild.member(this.author).roles;
      if (!userRoles.highest.permissions.any(this.requiredPermissions)) {
        throw new Error('Missing permissions');
      }
    }
  }

  public abstract async handle(message: Message): Promise<void>;
}
