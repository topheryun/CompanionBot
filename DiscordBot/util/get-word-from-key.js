const { catArray } = require("../arrays/cat-array");
const { holidayArray } = require("../arrays/holiday-array");
const { getApiWordAppend, getTaco, quoteSwanson, getApiWord, chuckNorris } = require("./api/get-api-word");
const { getRandomInteger } = require("./MathUtil")
const { genericResponses, positiveResponses, negativeResponses } = require("./messaging/generic-responses")

async function getWordFromKey(discordMessage, args, modifier) {
    let key = args;
    let data;
    let choice;

    // console.log("key: " +key)

    // physical databases
    if (key.localeCompare("cat") == 0) {
        choice = getRandomInteger(0, catArray.length - 1);
        data = catArray[choice];
        sendMessage(discordMessage, data, modifier);
    }
    else if (key.localeCompare("holiday") == 0) {
        choice = getRandomInteger(0, holidayArray.length - 1);
        data = holidayArray[choice];
        sendMessage(discordMessage, data, modifier);
    }
    // taco
    else if (key.localeCompare("taco") == 0) {
        getTaco(discordMessage, key);
    }
    // ron swanson quote
    else if (key.localeCompare("ron") == 0 || key.localeCompare("swanson") == 0) {
        quoteSwanson(discordMessage, key);
    }
    // chuck norris joke
    else if (key.localeCompare("chuck") == 0) {
        chuckNorris(discordMessage, key);
    }
    // request returns a list
    else if (key.localeCompare("country") == 0 || key.localeCompare("sport") == 0) {
        data = await getApiWord(key);
        sendMessage(discordMessage, data);
    }
    // normal requests and ones with words appended at the end
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

module.exports = {
    getWordFromKey
};