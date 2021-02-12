const {Queue} = require("./Queue.js");

// How long the bot waits to start typing a reply
const replyDelay = 1000;
// The amount of time (ms) it takes to 'write' each character in the response
const typingDelay = 100;

let messageQueue = new Queue();

/**
 * Responds to the given message with a custom response
 * @param {String | String[]} botReply - The message or messages array to be sent by the bot
 * @param {Object} discordMessage - The discord message object
 */
function reply(botReply, discordMessage) {
    if(Array.isArray(botReply)){
        for(const s of botReply){
            if (typeof s != 'string') continue;
            messageQueue.enqueue({botReply: s, discordMessage});
        }
    } else if (typeof botReply == 'string') {
        messageQueue.enqueue({botReply, discordMessage});
    }
    checkQueue();
}

/**
 * Checks the queue and starts the next message if one exists
 */
function checkQueue() {
    if(messageQueue.isEmpty()) return;

    const message = messageQueue.dequeue();

    startMessage(message.botReply, message.discordMessage);
/*
    console.log("Is it an array?");

    if (Array.isArray(message.botReply)) {
        for (const s of message.botReply) {
            if (typeof s != 'string') continue;
            startMessage(s, message.discordMessage);
        }
    } else if (typeof message.botReply == 'string') {
        startMessage(message.botReply, message.discordMessage);
    }*/
}

/**
 * Begins the messaging process
 * @param {String} botReply - The message or messages array to be sent by the bot
 * @param {Object} discordMessage - The discord message object
 */
async function startMessage(botReply, discordMessage) {
    setTimeout(() => {
        discordMessage.channel.startTyping();
        setTimeout(() => {
            discordMessage.channel.send(botReply);
            discordMessage.channel.stopTyping();
            checkQueue();
        }, calculateLength(botReply));
    }, replyDelay);
}

/**
 * Calculates how long it will take the bot to 'type' out the given reply.
 * @param {String} botReply - The reply the bot is going to send
 * @returns {Number} - The time in ms it would take to type out the reply
 */
function calculateLength(botReply) {
    return String(botReply).length * typingDelay;
}

module.exports = {
    reply
}