/**
 * @author admin
 */

import {injectable} from "tsyringe";
import {Command} from "../../shared/Command";
import {Message, MessageOptions} from "discord.js";
import * as quotesData from './assets/quotes.json';
import { sample } from "lodash";

@injectable()
export class CalvinCommand extends Command {

    constructor(message: Message) {
        super(message);
    }

    async run() {
        try {
            this.channel.startTyping();
            await this.channel.send({
                content: sample(quotesData),
            } as MessageOptions);
            this.channel.stopTyping();
        } catch (e) {
            this.logger.error('Unable to run command', e);
        }
    }
}
