const { URL } = require('../config.json');
const fetch = require("node-fetch");

const name = "save";

function execute(discordMessage, args) {
    let userId = discordMessage.author.id.toString();
    let affection = 0;
    let gender = "f";

    // saveConfigurationToServer(userId, affection, gender);

    // setAffection(userId, 8);

    // getConfigurationFromServer(userId).then(value => {
    //     console.log(value)
    //     discordMessage.channel.send("userId: "+value.userId);
    //     discordMessage.channel.send("affection: "+value.affection);
    //     discordMessage.channel.send("my gender: "+value.gender);
    // });
}

async function setAffection(userId, affection) {
    let configuration = {
        userId: userId,
    }

    await fetch(URL + affection, {
        method: "PUT",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(configuration)
    })
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

async function getConfigurationFromServer(userId) {
    let response = await fetch(URL + userId, { method: "GET" });
    if (response.status === 200) return await response.json();
}

module.exports = {
    name,
    execute
}