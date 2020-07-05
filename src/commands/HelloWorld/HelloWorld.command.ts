/**
 * @author admin
 */
import {injectable} from "tsyringe";
import {Command} from "../../shared/Command";
import {Message} from "discord.js";

@injectable()
export class HelloWorldCommand extends Command {

    constructor(message: Message) {
        super(message);
    }

    async run() {
        this.logger.info('New Message', this.author);
        this.channel.startTyping()
        await this.channel.send({
            content: `
const var = 'world';
export function func() {
    console.log('hello', world);
}`,
            code: 'js'
        });
        this.channel.stopTyping();
    }
}
