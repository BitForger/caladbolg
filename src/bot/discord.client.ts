/**
 * @author admin
 */

import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { CommandOrchestrator } from './command.orchestrator';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class DiscordClient {
  private _client: Client;

  constructor(
    private readonly orchestator: CommandOrchestrator,
    @InjectPinoLogger() private logger: PinoLogger,
  ) {
    this._client = new Client({
      presence: {
        status: 'online',
        activity: {
          type: 'LISTENING',
          name: 'The wails of tortured souls',
        },
      },
    });

    const commandPrefix = '>';

    this._client.on('ready', () => {
      this.logger.info('Logged In');
    });

    this._client.on('message', async msg => {
      if (msg.content.startsWith(commandPrefix)) {
        this.logger.info('Command received! Executing!');
        msg.content = msg.content.replace(commandPrefix, '');
        await this.orchestator.exec(msg);
      }
    });

    this._client.on('error', async args => {
      this.logger.error(args);
    });

    this._client.login(process.env.DISCORD_TOKEN);
  }

  get client() {
    return this._client;
  }
}
