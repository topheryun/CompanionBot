const { getApiWordPostAppend } = require("./api/get-api-word");

const name = "default";
const description = "Gets a random API word";

async function getWordFromKey(discordMessage, args) {
    let key = args;
    let data = await getApiWordPostAppend(key);
    discordMessage.channel.send(data);
}

module.exports = {
    name,
    description, 
    getWordFromKey
};