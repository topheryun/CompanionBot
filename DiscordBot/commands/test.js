const messaging = require("../util/messaging/MessageUtil");
let {botInstance} = require("../CompanionBot.js");
const name = "test";

function execute(discordMessage, args) {
    botInstance.messageCount;
    messaging.reply([`Hello ${discordMessage.author.username}! I hope you're having a great day!`, "testing", 'out', 'arrays', `Response ${botInstance.messageCount}`], discordMessage);
}

module.exports = {
	name,
    execute
};