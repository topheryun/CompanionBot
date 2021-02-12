const messaging = require("../util/MessageUtil");
const name = "test";

function execute(discordMessage, args) {
    messaging.reply(`Hello ${discordMessage.author.username}! I hope you're having a great day!`, discordMessage);
}

module.exports = {
	name,
    execute
};