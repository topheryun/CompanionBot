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
    if (affectionLevel < 15) messaging.reply("eww", discordMessage);
    else if (affectionLevel < 30) messaging.reply("Seriously?", discordMessage);
    else if (affectionLevel < 45) messaging.reply("awww, thanks", discordMessage);
    else if (affectionLevel < 60) messaging.reply("same!", discordMessage);
    else if (affectionLevel < 75) messaging.reply("I love you too!", discordMessage);
    else return messaging.reply("YOU HAVE REACHED THE SPOUSE RELATIONSHIP STATUS CONGRATULATIONS", discordMessage);
}

module.exports = {
    calculateRelationshipStatus,
    affectionResponse
}