message.channel.startTyping();
/*
            let msg = "I've found my ansr!";

            setTimeout(() => {
                message.channel.send("I've found my ansr!")
            }, calculateLength(msg));

            setTimeout(() => {
                message.channel.send("sorry")
            }, calculateLength(msg += "sorry"));
            */

/**
 * 
 * @param {String} botResponse - The message or messages array to be sent by the bot
 */
function sendMessage(botResponse, discordMessage) {
    if (Array.isArray(botResponse)) {
        for (const s of botResponse) {
            if (typeof s != "string") continue;

        }
    } else if (typeof s == "string") {
        startMessage(botResponse);
    }

    setTimeout(() => {

    }, (100))
}

function startMessage(botResponse) {
    
}

function calculateLength(botResponse) {
    if (typeof message != "string") return;
}