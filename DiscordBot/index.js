const Discord = require('discord.js');
const fs = require('fs');
const { CHANNEL, PREFIX, TOKEN } = require('./config.json');

let { botInstance } = require("./CompanionBot");
const messaging = require("./util/messaging/MessageUtil");

const { getWordFromKey } = require('./util/get-word-from-key');
const { parseDiscordMessage } = require("./util/messaging/message-parser");
//const introduction = require("./commands/mention");

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

    if (discordMessage.channel.id != CHANNEL) return; //returns if the message is not in the designated channel
    if (discordMessage.author.bot) return; // returns if the msg is by the bot

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
        let msg = discordMessage.content.toLowerCase();
        const messageArray = msg.trim().split(/ +/);

        botInstance.messageCount++;
        for (let word of messageArray) {
            if (getUserFromMention(word) == `807289535184109618`) { //If Scraper bot is mentioned at all
                
                if (!botInstance.friend) {
                    messaging.reply([`You seem cool ${discordMessage.author.username} let's hang out 😜!`], discordMessage);
                    botInstance.friend = discordMessage.author;
                }
                else if (botInstance.friend == discordMessage.author) {
                    if (String(discordMessage.content).toLowerCase().includes('i hate you')) {
                        messaging.reply(`💔😭😭😭😭 You're the ***WORST*** ${botInstance.friend.username}. I don't want to talk to you anymore!`, discordMessage);
                        botInstance.friend = null;
                    } else {
                        messaging.reply([`Why are you mentioning me silly 😜`], discordMessage);
                    }
                } else {
                    messaging.reply(`Eww stay away from me ${discordMessage.author.username}, I'm talking to ${botInstance.friend.username} right now.`, discordMessage);
                }
                break;
            }
        }

        keyword = parseDiscordMessage(discordMessage);
        if (keyword == null || keyword.localeCompare("") == 0) 
            discordMessage.channel.send(`I don't know what you mean by "${discordMessage.content}"`);
        else {
            getWordFromKey(discordMessage, keyword);
        }

    }
});

function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        console.log(mention)
        return client.users.cache.get(mention);
    }
}

client.login(TOKEN);