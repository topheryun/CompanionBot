const { getApiWordPostAppend } = require("./api/get-api-word");
const { getRandomInteger } = require("./MathUtil")
const { genericResponses, positiveResponses, negativeResponses } = require("./messaging/generic-responses")


const name = "default";
const description = "Gets a random API word";

async function getWordFromKey(discordMessage, args) {
    let key = args;
    let data = await getApiWordPostAppend(key);

    if (data.localeCompare("") == 0) {
        discordMessage.channel.send("No opinion."); // vary responses
    }
    else {
        let randomInt = getRandomInteger(0, genericResponses.length);
        let message = `${genericResponses[randomInt]} ${data}`
    
        discordMessage.channel.send(message);
    }
}

module.exports = {
    name,
    description, 
    getWordFromKey
};