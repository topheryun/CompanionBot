function getRandomInteger(min, max) {
    return Math.floor(getRandomDouble(min, max));
}

function getRandomDouble(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
    getRandomDouble,
    getRandomInteger
}