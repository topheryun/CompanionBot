const { catArray } = require("../arrays/cat-array");
const { holidayArray } = require("../arrays/holiday-array");
const { getApiWordAppend, getTaco, getQuote, getCocktail, programmingJoke,
    quoteSwanson, getApiWord, chuckNorris, getTrivia } = require("./api/get-api-word");
const { getRandomInteger, getRandomDouble } = require("./MathUtil");
const { genericResponses, positiveResponses, negativeResponses } = require("./messaging/generic-responses");

async function getWordFromKey(discordMessage, args, modifier) {
    let key = args;
    let data;
    let choice;

    switch (key) {
        case "cat":
            choice = getRandomInteger(0, catArray.length - 1);
            data = catArray[choice];
            sendMessage(discordMessage, data, modifier);
            break;
        case "holiday":
            choice = getRandomInteger(0, holidayArray.length - 1);
            data = holidayArray[choice];
            sendMessage(discordMessage, data, modifier);
            break;
        case "number":
            choice = getRandomDouble(-10000, 10000);
            sendMessage(discordMessage, choice, modifier);
            break;
        case "taco": getTaco(discordMessage, key);
            break;
        case "quote": getQuote(discordMessage, key);
            break;
        case "cocktail": getCocktail(discordMessage, key);
            break;
        case "trivia": getTrivia(discordMessage, key);
            break;
        case "ron":
        case "swanson": quoteSwanson(discordMessage, key);
            break;
        case "chuck norris": chuckNorris(discordMessage, key);
            break;
        case "programming joke": programmingJoke(discordMessage, key);
            break;
        case "country":
        case "sport":
            data = await getApiWord(key);
            sendMessage(discordMessage, data);
            break;
        default:
            data = await getApiWordAppend(key);
            sendMessage(discordMessage, data, modifier);
    }
}

function sendMessage(discordMessage, data, modifier) {
    let message = "";

    if (modifier == -1) { //negative
        let randomInt = getRandomInteger(0, negativeResponses.length);
        if (randomInt <= 2)
            message = `${negativeResponses[randomInt]} ${data}`
        else if (randomInt > 2 && randomInt < 3)
            message = `${negativeResponses[randomInt][0]} ${data} ${negativeResponses[randomIntx][1]}`
        else message = `${data} ${negativeResponses[randomInt]}`

    } else if (modifier == 1) { //positive
        let randomInt = getRandomInteger(0, positiveResponses.length);
        if (randomInt <= 3)
            message = `${positiveResponses[randomInt]} ${data}`
        else if (randomInt > 3 && randomInt < 5)
            message = `${positiveResponses[randomInt][0]} ${data} ${positiveResponses[randomInt][1]}`
        else message = `${data} ${positiveResponses[randomInt]}`

    } else { //generic
        let randomInt = getRandomInteger(0, genericResponses.length);
        if (randomInt <= 3)
            message = `${genericResponses[randomInt]} ${data}`
        else if (randomInt > 3 && randomInt < 6)
            message = `${genericResponses[randomInt][0]} ${data} ${genericResponses[randomInt][1]}`
        else message = `${data} ${genericResponses[randomInt]}`
    }

    discordMessage.channel.send(message);
}

module.exports = {
    getWordFromKey
};