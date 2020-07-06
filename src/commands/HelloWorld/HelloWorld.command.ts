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
        await this.channel.send({
            content: `
const str = '${this.args.join(' ')}';
export function func() {
    console.log('hello', str);
}`,
            code: 'js'
        });
    }
}
