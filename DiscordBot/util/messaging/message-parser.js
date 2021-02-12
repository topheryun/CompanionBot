const { apiMap } = require("../api/api-map");
const { positiveWords, negativeWords } = require("./generic-responses")

function parseDiscordMessage(discordMessage) {
    let userMessage = discordMessage.content.toLowerCase();

    const args = userMessage.trim().split(/ +/);

    return properKeywords(args);
}

function properKeywords(args) {
    for (let arg of args) {
        if (apiMap.has(arg)) return arg;
    }
    return null;
}


function parseDiscordMessageforModifier(discordMessage) { //Modifier as in positive and negative words
    let userMessage = discordMessage.content.toLowerCase();
    // remove question mark
    const args = userMessage.trim().split(/ +/);

    return properModifiers(args);
}

function properModifiers(args) {
    for (let arg of args) {
        if (positiveWords.exists(arg)) return arg;
        if (negativeWords.exists(arg)) return arg;
    }
    return null;
}

module.exports = {
    parseDiscordMessage,
    parseDiscordMessageforModifier
}