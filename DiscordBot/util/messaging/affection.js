const messaging = require("./MessageUtil");
let { botInstance } = require("../../CompanionBot");

function calculateRelationshipStatus() {
    let affectionLevel = botInstance.affection;
    if (affectionLevel < 15) return "stranger";
    else if (affectionLevel < 30) return "friend";
    else if (affectionLevel < 45) return "close friend";
    else if (affectionLevel < 60) return "potential lover";
    else if (affectionLevel < 75) return "lover";
    else return "spouse";
}

function affectionResponse(discordMessage) {
    let affectionLevel = botInstance.affection;
    if (affectionLevel < 15) {
        discordMessage.react('🤢');
        messaging.reply("eww", discordMessage);
    }
    else if (affectionLevel < 30) {
        discordMessage.react('💤');
        messaging.reply("Seriously?", discordMessage);
    }
    else if (affectionLevel < 45) {
        discordMessage.react('👍');
        messaging.reply("awww, thanks", discordMessage);
    }
    else if (affectionLevel < 60) {
        discordMessage.react('❤️')
        messaging.reply("same!", discordMessage);
    }
    else if (affectionLevel < 75 || affectionLevel > 75) {
        discordMessage.react('💖');
        discordMessage.react('💞');
        messaging.reply("I love you too!", discordMessage);
    }
    else {
        discordMessage.react('💖');
        discordMessage.react('💞');
        messaging.reply("I love you too!", discordMessage);
        //discordMessage.react('💍');
        //return messaging.reply("YOU HAVE REACHED THE SPOUSE RELATIONSHIP STATUS CONGRATULATIONS", discordMessage);
    }
}

function affectionEmbed() {
    let affectionLevel = botInstance.affection;
    if (affectionLevel < 15) return "Stranger"
    else if (affectionLevel < 30) return "Acquaintance"
    else if (affectionLevel < 45) return "Friend"
    else if (affectionLevel < 60) return "Best Friend"
    else if (affectionLevel < 75) return "Crush ❤️ "
    else return "Spouse 💗💗💗"
}

module.exports = {
    calculateRelationshipStatus,
    affectionResponse,
    affectionEmbed
}