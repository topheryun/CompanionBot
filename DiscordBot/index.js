const Discord = require('discord.js');
const fs = require('fs');
const { CHANNEL, PREFIX, TOKEN } = require('./config.json');

const { getWordFromKey } = require('./util/get-word-from-key');
const { parseDiscordMessage } = require("./util/messaging/message-parser");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


client.once('ready', () => {
    console.log('Ready!');
});

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', discordMessage => {

    if(discordMessage.channel.id != CHANNEL) return; //returns if the message is not in the designated channel
    if(discordMessage.author.bot) return; // returns if the msg is by the bot

    if (discordMessage.content.startsWith(PREFIX)) { //If the message has a prefix

        const args = discordMessage.content.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // the following 2 lines allow aliases
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        try {
            command.execute(discordMessage, args);
        } catch (error) {
            console.error(error);
            discordMessage.reply('there was an error trying to execute that command.');
        }

    } else { // open conversation
        keyword = parseDiscordMessage(discordMessage);
        if (keyword == null) discordMessage.channel.send(`I don't know what you mean by "${discordMessage.content}"`);
        else {
            //if(positive =)
            getWordFromKey(discordMessage, keyword);
        }
    }
});

client.login(TOKEN);