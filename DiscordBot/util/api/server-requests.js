const { URL } = require('../config.json');
const fetch = require("node-fetch");

// setters
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

// getters
async function getConfigurationFromServer(userId) {
    let response = await fetch(URL + userId, { method: "GET" });
    if (response.status === 200) return await response.json();
}

module.exports = {
    saveConfigurationToServer,

    getConfigurationFromServer
}