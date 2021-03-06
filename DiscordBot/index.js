const Discord = require('discord.js');
const { CHANNEL, TOKEN } = require('./config.json');

let { botInstance } = require("./CompanionBot");
const { greetings } = require('./util/messaging/generic-responses');

const messaging = require("./util/messaging/MessageUtil");

const { configBotGender } = require("./util/bot-config");
const { getWordFromKey } = require('./util/get-word-from-key');
const { parseDiscordMessage, isModifier, checkConfigPhrase } = require("./util/messaging/message-parser");
const { getRandomInteger } = require('./util/MathUtil');
const { sayInterests } = require('./util/messaging/say-interests');
const { affectionResponse, affectionEmbed } = require('./util/messaging/affection');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', discordMessage => {
    //if (discordMessage.channel.id != CHANNEL) return; //returns if the message is not in the designated channel
    if (discordMessage.author.bot) return; // returns if the msg is by the bot

    botInstance.messageCount++;
    let msg = discordMessage.content.toLowerCase();
    const messageArray = msg.trim().split(/ +/);
    let messageTone = 0; //-1 is negative, 0 is generic, 1 is positive

    if (!botInstance.friend) { //Config phase  
        let pingCheck = false;

        for (let word of messageArray) {
            if (getUserFromMention(word) == `807289535184109618`) pingCheck = true;
            if (checkConfigPhrase(word)) pingCheck = true;
        }

        if (pingCheck) {
            let greetingChoice = getRandomInteger(0, greetings.length - 1);
            discordMessage.channel.send(`${greetings[greetingChoice]}, what is my name?`);
            setBotName(discordMessage);
        }
    }
    else {
        for (let word of messageArray) {
            if (getUserFromMention(word) == `807289535184109618`) { //If Scraper bot is mentioned at all
                if (botInstance.friend == discordMessage.author) {
                    if (String(discordMessage.content).toLowerCase().includes('i hate you')) {
                        messaging.reply(`💔😭😭😭😭 You're the ***WORST*** ${botInstance.friend.username}. I don't want to talk to you anymore!`, discordMessage);
                        botInstance.friend = null;
                    } else messaging.reply([`Why are you mentioning me silly 😜`], discordMessage);
                }
                break;
            }

            if (messageTone == 0) messageTone = isModifier(word)
        }

        if (botInstance.friend == discordMessage.author) {
            botInstance.affection += 3;

            let keyword = parseDiscordMessage(discordMessage);
            console.log(`keyword: ${keyword}`)
            
            if (keyword == null || keyword.localeCompare("") == 0)
                discordMessage.react('🤷');
            else {
                if (keyword.localeCompare("picture") == 0) {

                    let embed = getEmbed();
                    discordMessage.channel.send(embed);
                }
                else if (keyword.localeCompare("i love you") == 0) affectionResponse(discordMessage);
                else if (keyword.localeCompare("interests") == 0) sayInterests(discordMessage);
                else getWordFromKey(discordMessage, keyword, messageTone);
            }
        } else {
            messaging.reply(`Eww stay away from me ${discordMessage.author.username}, I'm talking to ${botInstance.friend.username} right now.`, discordMessage);
        }
    }
});

async function setBotName(discordMessage) {
    const filter = m => m.content && m.author.id === discordMessage.author.id;
    const nameCollector = discordMessage.channel.createMessageCollector(filter, { max: 1, time: 20000 });
    await nameCollector.on('collect', message => {
        console.log(`Collected ${message.content}`);
        botInstance.name = message.content;
        discordMessage.channel.send("What is my gender?");
        setBotGender(discordMessage);
    });
}

async function setBotGender(discordMessage) {
    const filter = m => m.content && m.author.id === discordMessage.author.id;
    const genderCollector = discordMessage.channel.createMessageCollector(filter, { max: 1, time: 20000 });
    await genderCollector.on('collect', message => {
        console.log(`Collected ${message.content}`);
        configBotGender(message.content);
        botInstance.friend = discordMessage.author;
        discordMessage.channel.send(getEmbed())
        sayInterests(discordMessage);
    });
}

function getUserFromMention(mention) {
    if (!mention) return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) mention = mention.slice(1);
        console.log(mention)
        return client.users.cache.get(mention);
    }
}

function getEmbed() {
    const embed = new Discord.MessageEmbed()
        .setColor('#FFC0CB')
        .setTitle( botInstance.name )
        .addField( affectionEmbed(), `Affection ${botInstance.affection}` )
        .setImage(botInstance.imageURL)
    return embed
}

client.login(TOKEN);