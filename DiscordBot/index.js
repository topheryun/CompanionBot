const Discord = require('discord.js');
const { CHANNEL, TOKEN } = require('./config.json');

let { botInstance } = require("./CompanionBot");
const messaging = require("./util/messaging/MessageUtil");

const { configBotGender } = require("./util/bot-config");
const { getWordFromKey } = require('./util/get-word-from-key');
const server = require("./util/api/server-requests");
const pictures = require("./arrays/pic-array")
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
    let messageTone = 0; //-1 is negative, 0 is generic, 1 is positive

    //who are you
    //who am i? my name

    if (!botInstance.friend) { //Config phase

        // discordMessage.channel.send("Do you wanna chat? lets do it"); //bypassing
        // botInstance.friend = discordMessage.author.id;

        let pingCheck = false;

        for (let word of messageArray) {
            if (getUserFromMention(word) == `807289535184109618`) pingCheck = true;
        }

        if (checkConfigPhrase(discordMessage) || pingCheck) {
            let greetingChoice = getRandomInteger(0, greetings.length - 1);
            discordMessage.channel.send(`${greetings[greetingChoice]} who am I?`);
            setBotName(discordMessage);
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


        if (botInstance.friend == discordMessage.author.id) {
            //affection++ for each message sent by user
            let keyword = parseDiscordMessage(discordMessage);
            console.log(`keyword: ${keyword}`)
            if (keyword == null || keyword.localeCompare("") == 0)
                messaging.reply(`I don't know what you mean by "${discordMessage.content}"`, discordMessage); //fixable if the user is just chatting
            else {
                if (keyword.localeCompare("picture") == 0) { // add "what do you look like?"", "pic"
                    let embed = sendEmbed(discordMessage.author.id)
                    discordMessage.channel.send(embed);
                } else {
                    getWordFromKey(discordMessage, keyword, messageTone);
                }
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
        // set bot's name with message.content
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
    });
}

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

function sendEmbed(userId) {

    //getConfigurationFromServer(userId).then(data => {
    let datagender = "f";

    let image = "";
    if (datagender == "m") {
        let rng = getRandomInteger(0, pictures.maleImages.length - 1);
        image = pictures.maleImages[rng];
    } else if (datagender == "f") {
        let rng = getRandomInteger(0, pictures.femaleImages.length - 1);
        image = pictures.femaleImages[rng];
    } else {
        let rng = getRandomInteger(0, pictures.nonBinaryImages.length - 1);
        image = pictures.nonBinaryImagesImages[rng];
    }

    const embed = new Discord.MessageEmbed()
        .setColor('#FFC0CB')
        //  helper function to convert affection number to a string description
        .addField('Affection', 32, true) //affection -- data.affection
        .setImage(image) //IMAGE URL

    return embed
    //});
}

client.login(TOKEN);