const Discord = require('discord.js');
const fs = require('fs');
const { PREFIX, TOKEN } = require('./config.json');
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

    if (!discordMessage.content.startsWith(PREFIX) || discordMessage.author.bot) return;
    // console.log(message.author.username + ": " + message.content);

    const args = discordMessage.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // the following 2 lines allow aliases
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    //bot.respond("lasodasd", discordMessage);

    console.log(discordMessage.content);

    try {
        command.execute(discordMessage, args);
    } catch (error) {
        console.error(error);
        discordMessage.reply('there was an error trying to execute that command.');
    }
});

client.login(TOKEN);