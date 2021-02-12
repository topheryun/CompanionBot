const { TOKEN } = require('../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

const name = 'mention';
const description = 'Respond to being Mentioned!';

client.login(`${TOKEN}`);

function execute(message, args) {
    if (args[0]) {
        const user = getUserFromMention(args[0]);
        if (!user) {
            return message.reply('Please use a proper mention if you want to see someone elses avatar.');
        }
        if(user == `807289535184109618`)
            return message.channel.send(`Hey ${user.username}! Lets talk for a while 😊`);
    }

    return message.channel.send(`Are you trying to talk to me, ${message.author.username}?`);
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

module.exports = {
    name,
    description,
    execute
};