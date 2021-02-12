const { apiMap } = require("../api/api-map");

function parseDiscordMessage(discordMessage) {
    let userMessage = discordMessage.content.toLowerCase();
    // remove question mark
    const args = userMessage.trim().split(/ +/);

    return properKeywords(args);
}

function properKeywords(args) {
    for (let arg of args) {
        if (apiMap.has(arg)) return arg;
    }
    return null;
}

module.exports = {
    parseDiscordMessage
}