let apiMap = new Map([
    ["pokemon", { URL: "https://pokeapi.co/api/v2/pokemon/", APPEND: "", MAX_RANGE: 898 }],
    ["dog", { URL: "https://api.thedogapi.com/v1/breeds/", APPEND: "", MAX_RANGE: 264 }],
    // ["dogs", { URL: "https://api.thedogapi.com/v1/breeds/", APPEND: "", MAX_RANGE: 264 }],
    ["anime", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "", MAX_RANGE: 4260 }],
    // ["animes", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "", MAX_RANGE: 4260 }],
    ["anime character", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "", MAX_RANGE: 4260 }],
]);

module.exports = { apiMap }
