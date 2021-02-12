const { apiMap } = require("../api/api-map");

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

    switch (arg) {
        case "anime": 
            if (args[i].localeCompare("character") == 0 || args[i].localeCompare("director") == 0 ||
            args[i].localeCompare("genre") == 0) 
                return arg + " " + args[i];
            else if (args[i].localeCompare("voice") == 0 || args[i].localeCompare("va") == 0)
                return arg + " va";
    }
}

module.exports = {
    parseDiscordMessage
}