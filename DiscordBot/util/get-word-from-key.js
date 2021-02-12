const { getApiWordPostAppend } = require("./api/get-api-word");
const { getRandomInteger } = require("./MathUtil")
const { genericResponses, positiveResponses, negativeResponses } = require("./generic-responses")


const name = "default";
const description = "Gets a random API word";

async function getWordFromKey(discordMessage, args) {
    let key = args;
    let data = await getApiWordPostAppend(key);

    let randomInt = getRandomInteger(0, genericResponses.length);
    let message = `${genericResponses[randomInt]}${data}`

    discordMessage.channel.send(message);
}

module.exports = {
    name,
    description, 
    getWordFromKey
};