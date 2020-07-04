/**
 * @author admin
 */
import 'reflect-metadata';
import {container} from "tsyringe";
import {Client} from 'discord.js'
import {config} from "dotenv";
import {CommandOrchestrator} from "./command.orchestrator";
config();

const commandClient = new Client({
    presence: {
        status: "online"
    }
});

const commandPrefix = ">";

(async () => {
    const orchestator = container.resolve<CommandOrchestrator>(CommandOrchestrator);
    commandClient.on('ready', () => {
        console.log('Login succeeded');
    });

    commandClient.on('message', async msg => {
        if (msg.content.startsWith(commandPrefix)) {
            msg.content = msg.content.replace(commandPrefix, '');
            await orchestator.exec(msg);
        }
    });

    await commandClient.login(process.env.DISCORD_TOKEN);
})()
