/**
 * @author admin
 */
import 'reflect-metadata';
import {Client} from 'discord.js'
import {config} from "dotenv";
import {CommandOrchestrator} from "./command.orchestrator";
import {container} from "tsyringe";
import { Logger } from './shared/Logger';
config();

const commandClient = new Client({
    presence: {
        status: "online",
        activity: {
            type: "LISTENING",
            name: "The wails of tortured souls"
        }
    }
});

const commandPrefix = ">";

(async () => {
    const orchestator = container.resolve<CommandOrchestrator>(CommandOrchestrator);
    const logger = container.resolve<Logger>(Logger);
    commandClient.on('ready', () => {
        logger.info('Login succeeded');
    });

    commandClient.on('message', async msg => {
        if (msg.content.startsWith(commandPrefix)) {
            msg.content = msg.content.replace(commandPrefix, '');
            await orchestator.exec(msg);
        }
    });

    await commandClient.login(process.env.DISCORD_TOKEN);
})()
