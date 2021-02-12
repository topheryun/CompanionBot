const { apiMap } = require("../api/api-map");
const { positiveWords, negativeWords } = require("./generic-responses")

function parseDiscordMessage(discordMessage) {
    let userMessage = discordMessage.content.toLowerCase();
    userMessage = userMessage.replace(/\?/g,'');
    const args = userMessage.trim().split(/ +/);

    return properKeywords(args);
}

function properKeywords(args) {
    let arg = "";
    for (let i = 0; i < args.length; i++) {
        if (apiMap.has(args[i])) {
            return checkNextKeyword(args, i);
        } 
    }
    return arg;
}

function checkNextKeyword(args, i) {
    let arg = args[i++];

    if (i >= args.length) return arg;

    switch (arg) {
        case "anime": 
            if (args[i].localeCompare("character") == 0 || args[i].localeCompare("director") == 0 ||
            args[i].localeCompare("genre") == 0) 
                return arg + " " + args[i];
            else if (args[i].localeCompare("voice") == 0 || args[i].localeCompare("va") == 0)
                return arg + " va";
    }
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