import { Injectable } from '@nestjs/common';
import { DiscordClient } from '../../discord.client';
import { EmbedField, NewsChannel, TextChannel } from 'discord.js';

@Injectable()
export class MessagingService {
  constructor(private client: DiscordClient) {}

  async sendResult(channel: TextChannel | NewsChannel, ...embed: EmbedField[]) {
    await channel.send({
      embed: {
        fields: embed ?? [{ name: 'Success', value: 'Operation succeeded' }],
      },
    });
  }
}
