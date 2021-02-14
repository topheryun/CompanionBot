const { interestsArray } = require("../../arrays/interests");
const messaging = require("./MessageUtil");

function sayInterests(discordMessage) {
    // get three interests from interests array
    let shuffledInterests = shuffle(interestsArray);
    messaging.reply(`Some of my interests are pokemon, dogs, numbers!`, discordMessage);
    // messaging.reply(`Some of my interests: ${shuffledInterests[0]}, ${shuffledInterests[1]}, ${shuffledInterests[2]}`, discordMessage);
}

function shuffle(arr) {
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

module.exports = {
    sayInterests
}