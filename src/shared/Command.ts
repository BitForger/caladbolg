/**
 * @author admin
 */
import {Client, DMChannel, Message, MessageActivity, MessageType, NewsChannel, TextChannel, User} from "discord.js";

export abstract class Command {
    protected activity: MessageActivity;
    protected author: User;
    protected channel: TextChannel | DMChannel | NewsChannel;
    protected client: Client;
    protected type: MessageType;
    protected content: string;

    protected constructor(message: Message) {
        this.activity = message.activity;
        this.author = message.author;
        this.channel = message.channel;
        this.client = message.client;
        this.type = message.type;
        this.content = message.content;
        this.run();
    }

    public abstract run();
}
