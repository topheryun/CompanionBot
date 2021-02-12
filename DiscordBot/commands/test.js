const messaging = require("../util/messaging/MessageUtil");
const name = "test";

function execute(discordMessage, args) {
    messaging.reply([`Hello ${discordMessage.author.username}! I hope you're having a great day!`, "testing", 'out', 'arrays'], discordMessage);
}

module.exports = {
	name,
    execute
};