const fetch = require("node-fetch");
const { getRandomInteger } = require("../MathUtil");
const { apiMap } = require("./api-map");

async function getApiWordPostAppend(key) {
    value = apiMap.get(key);
    let randomNumber = getRandomInteger(1, value.MAX_RANGE);
    let response;

    do {
        response = await fetch(value.URL + randomNumber + "/" + value.APPEND + "/");
    } while (response.status != 200)
    //console.log(response);

    let data = await response.json();
    return returnType(key, data);
}

function returnType(key, data) {
    switch(key) {
        case "pokemon": return data.name;
        case "dog": return data.name;
        case "dogs": return data.name;
        case "anime": return data.title;
        case "animes": return data.title;
        case "anime character": 
            let choice = getRandomInteger(0, data.characters.length);
            return data.characters[choice].name;
    }
}

module.exports = {
    getApiWordPostAppend
}