/**
 * @author admin
 */

import { Injectable } from '@nestjs/common';
import { Client, ClientOptions, MessageOptions } from 'discord.js';
import { CommandOrchestrator } from './command.orchestrator';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class DiscordClient {
  private readonly _client: Client;

  private activities: Array<{
    type:
      | number
      | 'LISTENING'
      | 'PLAYING'
      | 'STREAMING'
      | 'WATCHING'
      | 'CUSTOM_STATUS';
    name: string;
    url?: string;
  }> = [
    {
      type: 'LISTENING',
      name: 'The wails of tortured souls',
      url: 'https://www.youtube.com/watch?v=s9YbICd43Mc',
    },
    {
      type: 'PLAYING',
      name: 'pretend',
      url: 'https://www.youtube.com/watch?v=Ct6BUPvE2sM',
    },
    {
      type: 'STREAMING',
      name: 'your mom',
      url: 'https://www.youtube.com/watch?v=jofNR_WkoCE',
    },
    {
      type: 'STREAMING',
      name: 'what are you doing step brother',
      url: 'https://www.youtube.com/watch?v=FUNo4aB8xFE',
    },
    {
      type: 'LISTENING',
      name: 'my last brain cells begging for mercy',
      url: 'https://www.youtube.com/watch?v=J71ILoiePMg',
    },
    {
      type: 'PLAYING',
      name: 'with your willy',
      url: 'https://www.youtube.com/watch?v=AMlyrdR1Uwg',
    },
    {
      type: 'WATCHING',
      name: 'the world burn',
      url: 'https://www.youtube.com/watch?v=8CKjNcSUNt8',
    },
  ];

  constructor(
    private readonly orchestator: CommandOrchestrator,
    @InjectPinoLogger() private logger: PinoLogger,
  ) {
    const randStatusIndex = Math.floor(Math.random() * this.activities.length);
    const clientOpts: ClientOptions = {
      presence: {
        status: 'online',
        activity: this.activities[randStatusIndex],
      },
    };
    this._client = new Client(clientOpts);

    const commandPrefix = '>';

    this._client.on('ready', () => {
      this.logger.info('Logged In');
    });

    this._client.on('message', async msg => {
      if (msg.content.startsWith(commandPrefix)) {
        this.logger.info('Command received! Executing!');
        msg.content = msg.content.replace(commandPrefix, '');

        if (msg.content.startsWith('presenceUrl')) {
          await msg.channel.send({
            content: clientOpts.presence.activity.url,
          } as MessageOptions);
        }

        await this.orchestator.exec(msg);
      }

      if (msg.content.includes('daddy')) {
        await msg.channel.send({
          content: 'https://www.youtube.com/watch?v=FrG4TEcSuRg',
        });
      }

      if (msg.content.startsWith('crazy frog')) {
        await msg.channel.send({
          content: 'https://www.youtube.com/watch?v=k85mRPqvMbE',
        });
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
