const { apiMap } = require("./api/api-map");

function parseDiscordMessage(discordMessage) {
    discordMessage.content = discordMessage.content.toLowerCase();
    // remove question mark
    const args = discordMessage.content.trim().split(/ +/);

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