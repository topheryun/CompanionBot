const { getApiWordPostAppend } = require("../util/api/get-api-word");

const name = "pokemon";
const aliases = ["dog", "dogs", "anime", "animes"];
const description = "Gets a random API word";

async function execute(discordMessage, args) {
    let key = discordMessage.content.slice(1);
    if (args.length == 0) {
        let data = await getApiWordPostAppend(key);
        discordMessage.channel.send(data);
    }
    else {
        for (let i = 0; i < args.length; i++) {
            if (args[i].localeCompare("character") == 0 || args[i].localeCompare("characters") == 0 || 
            args[i].localeCompare("char") == 0) {
                let data = await getApiWordPostAppend(key + " character");
                discordMessage.channel.send(data);
                break;
            }
        }       
    }
}

module.exports = {
    name,
    description, 
    aliases,
    execute
};