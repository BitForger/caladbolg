/**
 * @author admin
 */
import { Command, Verb } from 'nestjs-discord';
import { Injectable } from '@nestjs/common';

@Command({
  command: 'test',
})
@Injectable()
export class TestCommand {
  @Verb({
    verb: 'run',
  })
  run() {}
}
