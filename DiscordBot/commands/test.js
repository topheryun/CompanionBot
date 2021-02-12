const messaging = require("../util/messaging/MessageUtil");
let {botInstance} = require("../CompanionBot.js");
const name = "test";

function execute(discordMessage, args) {
    botInstance.messageCount++;
    if(botInstance.friend) {
        if(botInstance.friend == discordMessage.author) {
            if(String(discordMessage.content).toLowerCase().includes('i hate you')) {
                messaging.reply(`💔😭😭😭😭 You're the ***WORST*** ${botInstance.friend.username}. I don't want to talk to you anymore!`, discordMessage);
                botInstance.friend = null;
            } else {
                messaging.reply(`Nice to see you again ${botInstance.friend.username}. What would you like to talk about?`, discordMessage);
            }
        } else {
            messaging.reply(`Eww stay away from me ${discordMessage.author.username}, I'm talking to ${botInstance.friend.username} right now.`, discordMessage);
        }
    } else {
        messaging.reply([`You seem cool ${discordMessage.author.username} let's hang out.`], discordMessage);
        botInstance.friend = discordMessage.author;
    }
}

module.exports = {
	name,
    execute
};