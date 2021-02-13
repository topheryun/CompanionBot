const { apiMap } = require("../api/api-map");
const { messageModifiers } = require("./generic-responses")

function parseDiscordMessage(discordMessage) {
    let userMessage = discordMessage.content.toLowerCase();
    userMessage = userMessage.replace(/\?|!/g,'');
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
                return "anime " + args[i];
            else if (args[i].localeCompare("voice") == 0 || args[i].localeCompare("va") == 0)
                return "anime va";
        case "manga":
            if (args[i].localeCompare("author") == 0)
                return "mangaka";
        case "chuck":
            if (args[i].localeCompare("norris") == 0)
                return "chuck norris";
        case "star":
            if (args[i++].localeCompare("wars") == 0 && args[i].localeCompare("character") == 0)
                return "star wars character";
        case "programming":
            if (args[i].localeCompare("joke") == 0)
            return "programming joke";
        case "game":
            if (args[i++].localeCompare("of") == 0 && args[i++].localeCompare("thrones") == 0 && args[i].localeCompare("character") == 0)
                return "got character";
        case "got":
            if (args[i].localeCompare("character") == 0)
                return "got character";
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