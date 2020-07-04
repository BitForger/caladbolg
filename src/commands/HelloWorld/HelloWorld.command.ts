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

    run() {
    }
}
