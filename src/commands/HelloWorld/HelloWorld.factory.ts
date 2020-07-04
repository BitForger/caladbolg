/**
 * @author admin
 */

import {injectable} from "tsyringe";
import {HelloWorldCommand} from "./HelloWorld.command";
import {Message} from "discord.js";

@injectable()
export class HelloWorldFactory {
    build(message: Message): HelloWorldCommand {
        return new HelloWorldCommand(message);
    }
}
