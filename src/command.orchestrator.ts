/**
 * @author admin
 */
import {Message} from "discord.js";
import {inject, injectable} from "tsyringe";
import {HelloWorldFactory} from "./commands/HelloWorld/HelloWorld.factory";

@injectable()
export class CommandOrchestrator {
    private commands = [
        {command: 'hello', handler: this.helloWorldFactory.build}
    ];

    constructor(
        @inject(HelloWorldFactory) private helloWorldFactory: HelloWorldFactory
    ) {
    }

    public async exec(message: Message) {
        for (const command of this.commands) {
            if (message.content.startsWith(command.command)) {
                command.handler.apply(this, [message]);
            }
        }
    }
}
