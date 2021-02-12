const { getApiWord } = require("../util/api/get-api-word");

const name = "pokemon";
const aliases = ['commands'];
const description = "Gets a random API word";

async function execute(message, args) {
    let data = await getApiWord(name);
    message.channel.send(data);
}

module.exports = {
    name,
    description, 
    aliases,
    execute
};