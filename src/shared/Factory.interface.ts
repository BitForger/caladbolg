/**
 * @author admin
 */
import {Command} from "./Command";
import {Message} from "discord.js";

export interface Factory {
    build(message: Message): Command
}
