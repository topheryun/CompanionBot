const responseDelay = 1000;

/**
 * Responds to the given message with a custom response
 * @param {String | String[]} botResponse - The message or messages array to be sent by the bot
 * @param {Object} discordMessage - The discord message object
 */
function reply(botResponse, discordMessage) {
    if (Array.isArray(botResponse)) {
        for (const s of botResponse) {
            if (typeof s == 'string') continue;
            startMessage(s, discordMessage);
        }
    } else if (typeof botResponse == 'string') {
        startMessage(botResponse, discordMessage);
    }
}

function startMessage(botResponse, discordMessage) {
    setTimeout(() => {
        discordMessage.channel.startTyping();
        setTimeout(() => {
            discordMessage.channel.send(botResponse);
            discordMessage.channel.stopTyping();
        }, calculateLength(botResponse));
    }, responseDelay);
}

function calculateLength(botResponse) {
    return String(botResponse).length * 100;
}

module.exports = {
    reply
}