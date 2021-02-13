const { catArray } = require("../arrays/cat-array");
const { getApiWordAppend, getTaco } = require("./api/get-api-word");
const { getRandomInteger } = require("./MathUtil")
const { genericResponses, positiveResponses, negativeResponses } = require("./messaging/generic-responses")


const name = "default";
const description = "Gets a random API word";

async function getWordFromKey(discordMessage, args, modifier) {
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
    // normal requests with words appended at the end
    else {
        data = await getApiWordAppend(key);
        sendMessage(discordMessage, data, modifier);
    }
}

function sendMessage(discordMessage, data, modifier) {
    if (data.localeCompare("") == 0)
        discordMessage.channel.send("No opinion."); // vary responses
    else {

        let message = "";

        if (modifier == -1) { //negative
            let randomInt = getRandomInteger(0, negativeResponses.length);
            if (randomInt <= 2)
                message = `${negativeResponses[randomInt]} ${data}`
            else if (randomInt > 2 && randomInt < 3)
                message = `${negativeResponses[randomInt][0]} ${data} ${negativeResponses[randomIntx][1]}`
            else
                message = `${data} ${negativeResponses[randomInt]}`


        } else if (modifier == 1) { //positive
            let randomInt = getRandomInteger(0, positiveResponses.length);
            if (randomInt <= 3)
                message = `${positiveResponses[randomInt]} ${data}`
            else if (randomInt > 3 && randomInt < 5)
                message = `${positiveResponses[randomInt][0]} ${data} ${positiveResponses[randomInt][1]}`
            else
                message = `${data} ${positiveResponses[randomInt]}`

        } else { //generic
            let randomInt = getRandomInteger(0, genericResponses.length);
            if (randomInt <= 3)
                message = `${genericResponses[randomInt]} ${data}`
            else if (randomInt > 3 && randomInt < 6)
                message = `${genericResponses[randomInt][0]} ${data} ${genericResponses[randomInt][1]}`
            else
                message = `${data} ${genericResponses[randomInt]}`
        }

        discordMessage.channel.send(message);
    }
}

// idea for not just appending data, but having the key word in the middle

module.exports = {
    name,
    description,
    getWordFromKey
};