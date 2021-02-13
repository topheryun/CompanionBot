const fetch = require("node-fetch");
const { getRandomInteger } = require("../MathUtil");
const { apiMap } = require("./api-map");

async function getApiWordAppend(key) {
    value = apiMap.get(key);
    let randomNumber = getRandomInteger(1, value.MAX_RANGE);
    let response;
    let timeOut = 0;

    do {
        if (value.APPEND.localeCompare("") == 0) {
            response = await fetch(value.URL + randomNumber + "/");
        }
        else {
            response = await fetch(value.URL + randomNumber + "/" + value.APPEND + "/"); 
        }
        timeOut++;
    } while (response.status != 200 || timeOut >= 25)
    
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
        case "brewery": return data.name;
        case "programming joke": return data.joke;
        case "superhero": return data.name;
        case "anime character": 
            if (data.characters.length == 0) return "";
            choice = getRandomInteger(0, data.characters.length - 1);
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
            choice = getRandomInteger(0, data.characters.length - 1);
            return data.characters[choice].voice_actors[0].name;
        case "manga": return data.title;
        case "mangaka": return data.authors[0].name;
        case "star wars character": return data.result.properties.name;
        case "got character": return data.titles[0].localeCompare("") != 0 ? data.name + ", \"" + data.titles[0] + "\"" : data.name;

        // returns a list
        case "country":
            choice = getRandomInteger(0, data.countries.length - 1);
            return data.countries[choice].name_en;
        case "sport":
            choice = getRandomInteger(0, data.sports.length - 1);
            return data.sports[choice].strSport;
        

    }
}

async function getApiWord(key) {
    value = apiMap.get(key);
    let response = await fetch(value.URL);

    if (response.status === 200) {
        let data = await response.json();
        return returnType(key, data);
    }
    return null;
}

async function getTaco(discordMessage, key) {
    value = apiMap.get(key);
    let response = await fetch(value.URL);
    if (response.status === 200) {
        let data = await response.json();
        let message = `My favorite combo would be ${data.shell.name} with ${data.base_layer.name} seasoned with ${data.seasoning.name}. Some ${data.mixin.name} and ${data.condiment.name} on top!`;
        discordMessage.channel.send(message);
    }
}

async function quoteSwanson(discordMessage, key) {
    value = apiMap.get(key);
    let response = await fetch(value.URL);
    if (response.status === 200) {
        let data = await response.json();
        discordMessage.channel.send(data);
    }
}

async function getQuote(discordMessage, key) {
    value = apiMap.get(key);
    let response = await fetch(value.URL);
    if (response.status === 200) {
        let data = await response.json();
        let message = `${data.content} -${data.author}`;
        discordMessage.channel.send(message);
    }
}

async function getCocktail(discordMessage, key) {
    value = apiMap.get(key);
    let response = await fetch(value.URL);
    if (response.status === 200) {
        let data = await response.json();
        let message = `${data.drinks[0].strDrink} with extra ${data.drinks[0].strIngredient1}`;
        discordMessage.channel.send(message);
    }
}
        
async function chuckNorris(discordMessage, key) {
    value = apiMap.get(key);
    let randomNumber = getRandomInteger(1, value.MAX_RANGE);
    let response = await fetch(value.URL + randomNumber + "/");
    if (response.status === 200) {
        let data = await response.json();
        discordMessage.channel.send(data.value.joke);
    }
}

async function programmingJoke(discordMessage, key) {
    value = apiMap.get(key);
    let randomNumber = getRandomInteger(1, value.MAX_RANGE);
    let response = await fetch(value.URL + randomNumber);
    if (response.status === 200) {
        let data = await response.json();
        discordMessage.channel.send(data.joke);
    }
}

async function getTrivia(discordMessage, key) {
    value = apiMap.get(key);
    let response = await fetch(value.URL);
    if (response.status === 200) {
        let data = await response.json();
        discordMessage.channel.send(`Question: ${data.results[0].question}`);
        setTimeout(() => {
            discordMessage.channel.send(`Answer: ${data.results[0].correct_answer}`);
        }, 5000);
    }
}

module.exports = {
    getApiWordAppend,
    getApiWord,
    getTaco,
    quoteSwanson,
    getQuote,
    getCocktail,
    chuckNorris,
    programmingJoke,
    getTrivia
}