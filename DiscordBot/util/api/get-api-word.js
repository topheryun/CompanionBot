const fetch = require("node-fetch");
const { getRandomInteger } = require("../MathUtil");
const { apiMap } = require("./api-map");

async function getApiWordAppend(key) {
    value = apiMap.get(key);
    let randomNumber = getRandomInteger(1, value.MAX_RANGE);
    let response;

    do {
        response = await fetch(value.URL + randomNumber + "/" + value.APPEND + "/");
    } while (response.status != 200)
    
    let data = await response.json();
    return returnType(key, data);
}

function returnType(key, data) {
    let choice;
    switch(key) {
        case "pokemon": return data.name;
        case "dog": return data.name;
        case "anime": return data.title;
        case "anime genre": return data.genres[0].name; // data["genres"][0]["name"]
        case "anime character": 
            if (data.characters.length == 0) return "";
            choice = getRandomInteger(0, data.characters.length);
            return data.characters[choice].name;
        case "anime director": 
            if (data.staff.length == 0) return "";
            for (let i = 0; i < data.staff.length; i++) {
                for (let j = 0; j < data.staff[i].positions.length; j++) {
                    if (data.staff[i].positions[j].localeCompare("Director") == 0)
                        return data.staff[i].name;
                }
            }
            return "";
        case "anime va": 
            if (data.characters.length == 0) return "";
            choice = getRandomInteger(0, data.characters.length);
            return data.characters[choice].voice_actors[0].name;
    }
}

async function getTaco(discordMessage, key) {
    value = apiMap.get(key);
    let response = await fetch(value.URL);
    if (response.status === 200) {
        let data = await response.json();
        // add taco suggestion prepends
        let message = `My favorite combo would be ${data.shell.name} with ${data.base_layer.name} 
        seasoned with ${data.seasoning.name}. Some ${data.mixin.name} and ${data.condiment.name} on top!`;
        discordMessage.channel.send(message);
    }
}

module.exports = {
    getApiWordAppend,
    getTaco
}