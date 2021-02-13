const { catArray } = require("../arrays/cat-array");
const { getApiWordAppend, getTaco, quoteSwanson } = require("./api/get-api-word");
const { getRandomInteger } = require("./MathUtil")
const { genericResponses, positiveResponses, negativeResponses } = require("./messaging/generic-responses")


const name = "default";
const description = "Gets a random API word";

async function getWordFromKey(discordMessage, args) {
    let key = args;
    let data;
    let choice;

    // physical database
    if (key.localeCompare("cat") == 0) {
        choice = getRandomInteger(0, catArray.length);
        data = catArray[choice];
        sendMessage(discordMessage, data);
    }
    // taco
    else if (key.localeCompare("taco") == 0) {
        getTaco(discordMessage, key);
    }
    // ron swanson
    else if (key.localeCompare("ron") == 0 || key.localeCompare("swanson") == 0) {
        quoteSwanson(discordMessage, key);
    }
    // normal requests with words appended at the end
    else {
        data = await getApiWordAppend(key);
        sendMessage(discordMessage, data);
    } 
}

function sendMessage(discordMessage, data) {
    if (data.localeCompare("") == 0)
        discordMessage.channel.send("No opinion."); // vary responses
    else {
        let randomInt = getRandomInteger(0, genericResponses.length);
        let message = `${genericResponses[randomInt]} ${data}`

        discordMessage.channel.send(message);
    }
}

// idea for not just appending data, but having the key word in the middle

module.exports = {
    name,
    description,
    getWordFromKey
};