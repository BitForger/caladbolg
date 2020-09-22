import { Injectable } from '@nestjs/common';
import { DMChannel, EmbedField, NewsChannel, TextChannel } from 'discord.js';

@Injectable()
export class MessagingService {
  constructor() {}

  async sendResult(
    channel: TextChannel | DMChannel | NewsChannel,
    ...embed: EmbedField[]
  ) {
    await channel.send({
      embed: {
        fields: embed ?? [{ name: 'Success', value: 'Operation succeeded' }],
      },
    });
  }
}
