const { apiMap } = require("../api/api-map");
const { messageModifiers } = require("./generic-responses")

function parseDiscordMessage(discordMessage) {
    let userMessage = discordMessage.content.toLowerCase();
    userMessage = userMessage.replace(/\?|!/g, '');
    const args = userMessage.trim().split(/ +/);

    return properKeywords(args);
}

function properKeywords(args) {
    let arg = "";
    for (let i = 0; i < args.length; i++) {
        if (apiMap.has(args[i])) {
            return checkNextKeyword(args, i);
        } else if(args[i].localeCompare("pic") == 0 || args[i].localeCompare("picture") == 0)
            return "picture";
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
            break;
        case "manga":
            if (args[i].localeCompare("author") == 0)
                return "mangaka";
            break;
        case "chuck":
            if (args[i].localeCompare("norris") == 0)
                return "chuck norris";
            break;
        case "star":
            if (args[i++].localeCompare("wars") == 0 && args[i].localeCompare("character") == 0)
                return "star wars character";
            break;
        case "programming":
            if (args[i].localeCompare("joke") == 0)
                return "programming joke";
            break;
        case "game":
            if (args[i++].localeCompare("of") == 0 && args[i++].localeCompare("thrones") == 0 && args[i].localeCompare("character") == 0)
                return "got character";
            break;
        case "got":
            if (args[i].localeCompare("character") == 0)
                return "got character";
            break;
        case "super":
            if (args[i].localeCompare("hero") == 0)
                return "superhero";
            break;
        case "i":
            if (args[i++].localeCompare("love") == 0 && args[i].localeCompare("you") == 0)
                return "i love you";
            break;
        case "interest": return "interests";
        default: return arg;
    }
}

function isModifier(word) { //Modifier as in positive and negative words
    if (messageModifiers.has(word)) {
        return messageModifiers.get(word);
    }
    return 0
}

function checkConfigPhrase(word) {
    switch (word.toLowerCase()) {
        case "who are you":
        case "who are you?":
        case "hello":
        case "hello?":
        case "hello,":
        case "hello!":

            return true;
        default: return false;
    }
}

module.exports = {
    parseDiscordMessage,
    isModifier,
    checkConfigPhrase
}