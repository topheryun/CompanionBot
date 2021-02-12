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

    console.log(response);
    
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

module.exports = {
    getApiWordPostAppend
}