const { URL } = require('../config.json');
const fetch = require("node-fetch");

const name = "save";

function execute(discordMessage, args) {
    let userId = discordMessage.author.id.toString();
    let affection = 15;
    let gender = "f";
    saveConfigurationToServer(userId, affection, gender);

    discordMessage.channel.send('Pong.');
}

async function saveConfigurationToServer(userId, affection, gender) {
    let configuration = {
        userId: userId,
        affection: affection,
        gender: gender
    }

    await fetch(URL, {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(configuration)
    });

}

module.exports = {
    name,
    execute
}