/**
 * @author admin
 */

import {injectable} from "tsyringe";
import {Factory} from "../../shared/Factory.interface";
import {CalvinCommand} from "./Calvin.command";
import {Message} from "discord.js";

@injectable()
export class CalvinFactory implements Factory {
    build(message: Message): CalvinCommand {
        return new CalvinCommand(message);
    }

}
