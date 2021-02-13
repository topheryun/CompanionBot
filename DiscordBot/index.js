const Discord = require('discord.js');
const { CHANNEL, TOKEN } = require('./config.json');

let { botInstance } = require("./CompanionBot");
const messaging = require("./util/messaging/MessageUtil");

const { getWordFromKey } = require('./util/get-word-from-key');
const { parseDiscordMessage, isModifier, checkConfigPhrase } = require("./util/messaging/message-parser");
const { greetings } = require('./util/messaging/generic-responses');
const { getRandomInteger } = require('./util/MathUtil');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', discordMessage => {

    if (discordMessage.channel.id != CHANNEL) return; //returns if the message is not in the designated channel
    if (discordMessage.author.bot) return; // returns if the msg is by the bot

    let msg = discordMessage.content.toLowerCase();
    const messageArray = msg.trim().split(/ +/);
    let messageTone = 0;//-1 is negative, 0 is generic, 1 is positive

    //who are you
    //who am i? my name

    if (!botInstance.friend) { //Config phase
        let pingCheck = false;

        for (let word of messageArray) {
            if (getUserFromMention(word) == `807289535184109618`) pingCheck = true;
        }

        if (checkConfigPhrase(discordMessage) || pingCheck) {
            let greetingChoice = getRandomInteger(0,greetings.length - 1);
            messaging.reply(`${greetings[greetingChoice]}`, discordMessage);
            // set name
            // what's my gender?
            // get random image

            // message.channel.awaitMessages(filter, {
            //     max: 1,
            //     time: 30000,
            //     errors: ['time']
            //   })
            //   .then(message => {
            //     message = message.first()
            //     if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y') {
            //       message.channel.send(`Deleted`)
            //     } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N') {
            //       message.channel.send(`Terminated`)
            //     } else {
            //       message.channel.send(`Terminated: Invalid Response`)
            //     }
            //   })
            //   .catch(collected => {
            //       message.channel.send('Timeout');
            //   });
        }

    }
    else {
        botInstance.messageCount++;
        for (let word of messageArray) {
            if (getUserFromMention(word) == `807289535184109618`) { //If Scraper bot is mentioned at all

                // if (!botInstance.friend) {
                //     messaging.reply([`You seem cool ${discordMessage.author.username} let's hang out 😜!`], discordMessage);
                //     botInstance.friend = discordMessage.author;
                // }
                /*else */if (botInstance.friend == discordMessage.author) {
                    if (String(discordMessage.content).toLowerCase().includes('i hate you')) {
                        messaging.reply(`💔😭😭😭😭 You're the ***WORST*** ${botInstance.friend.username}. I don't want to talk to you anymore!`, discordMessage);
                        botInstance.friend = null;
                    } else {
                        messaging.reply([`Why are you mentioning me silly 😜`], discordMessage);
                    }
                }
                break;
            }

            if (messageTone == 0)
                messageTone = isModifier(word)

        }

        console.log("MESSAGE TONE IS " + messageTone)

        if (botInstance.friend == discordMessage.author) {
            //affection++ for each message sent by user
            let keyword = parseDiscordMessage(discordMessage);
            if (keyword == null || keyword.localeCompare("") == 0)
                messaging.reply(`I don't know what you mean by "${discordMessage.content}"`, discordMessage); //fixable if the user is just chatting
            else {
                if (keyword.localeCompare("picture") == 0) {
                    sendEmbed(discordMessage,)//gender, get picture, title, affection
                }
                else
                    getWordFromKey(discordMessage, keyword, messageTone);
            }
        } else {
            messaging.reply(`Eww stay away from me ${discordMessage.author.username}, I'm talking to ${botInstance.friend.username} right now.`, discordMessage);
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