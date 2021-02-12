const fetch = require("node-fetch");
const { apiMap } = require("./api-map");
// import number

async function getApiWord(key) {
    let randomNumber = 1;
    let response = await fetch(apiMap.get(key).URL + apiMap.get(key).APPEND + randomNumber + "/");

    if (response.status === 200) {
        let data = await response.json();
        return data.name;
    }
}

module.exports = {
    getApiWord
}