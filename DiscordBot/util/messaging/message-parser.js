const { apiMap } = require("../api/api-map");
const { messageModifiers } = require("./generic-responses")

function parseDiscordMessage(discordMessage) {
    let userMessage = discordMessage.content.toLowerCase();
    userMessage = userMessage.replace(/\?/g,'');
    const args = userMessage.trim().split(/ +/);

    console.log(args);

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
        default: return arg;
    }
}

function isModifier(word) { //Modifier as in positive and negative words

    if(messageModifiers.has(word)){
        return messageModifiers.get(word);
    }
    return 2
}

module.exports = {
    parseDiscordMessage,
    isModifier
}