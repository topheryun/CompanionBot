const { maleImages, femaleImages, nonBinaryImages } = require("../arrays/pic-array");
let { botInstance } = require("../CompanionBot");
const { getRandomInteger } = require('../util/MathUtil');

function configBotGender(message) {
    let choice;
    switch (message.toLowerCase()) {
        case "male":
        case "m": 
        case "boy":
        case "man":
        case "guy":
        case "dude":
            botInstance.gender = "m";
            choice = getRandomInteger(0, maleImages.length - 1);
            botInstance.imageURL = maleImages[choice];
        case "female":
        case "f":
        case "girl":
        case "woman":
        case "chick":
        case "gal":
        case "dudette":
            botInstance.gender = "f";
            choice = getRandomInteger(0, femaleImages.length - 1);
            botInstance.imageURL = femaleImages[choice];
        default:
            botInstance.gender = "x";
            choice = getRandomInteger(0, nonBinaryImages.length - 1);
            botInstance.imageURL = nonBinaryImages[choice];
    }
}

module.exports = {
    configBotGender,
}