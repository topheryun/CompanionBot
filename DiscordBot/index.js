const Discord = require('discord.js');
const fs = require('fs');
const { getWordFromKey } = require('./util/get-word-from-key');
const { CHANNEL, PREFIX, TOKEN } = require('./config.json');
const { parseDiscordMessage } = require('./util/message-parser');
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
<<<<<<< HEAD

    if(discordMessage.channel.id != CHANNEL) return; //returns if the message is not in the designated channel
    if(discordMessage.author.bot) return; // returns if the msg is by the bot
=======
    if (discordMessage.channel.id != "809473454406369300") return;
    if (!discordMessage.content.startsWith(PREFIX) || discordMessage.author.bot) return;
    // console.log(message.author.username + ": " + message.content);
>>>>>>> 3d985cdfa25845603704a012367ac2a9456fd61d

    if (discordMessage.content.startsWith(PREFIX)) { //If the message has a prefix

        const args = discordMessage.content.slice(PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // the following 2 lines allow aliases
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        console.log(discordMessage.content);
        discordMessage.content = "ping";

        try {
            command.execute(discordMessage, args);
        } catch (error) {
            console.error(error);
            discordMessage.reply('there was an error trying to execute that command.');
        }

    } else { // open conversation
        args = parseDiscordMessage(discordMessage);
        if (args == null) discordMessage.channel.send(`I don't know what you mean by "${discordMessage.content}"`);
        else { 
            getWordFromKey(discordMessage, args);
        }
    }
});

client.login(TOKEN);