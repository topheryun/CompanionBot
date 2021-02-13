let apiMap = new Map([
    // api normal & word append
    ["pokemon", { URL: "https://pokeapi.co/api/v2/pokemon/", APPEND: "", MAX_RANGE: 898 }],
    ["dog", { URL: "https://api.thedogapi.com/v1/breeds/", APPEND: "", MAX_RANGE: 264 }],
    ["anime", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "", MAX_RANGE: 4260 }],
    ["anime genre", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "", MAX_RANGE: 4260 }],
    ["anime character", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "characters_staff", MAX_RANGE: 4260 }],
    ["anime director", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "characters_staff", MAX_RANGE: 4260 }],
    ["anime va", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "characters_staff", MAX_RANGE: 4260 }],

    // single json return
    ["taco", { URL: "http://taco-randomizer.herokuapp.com/random/" }],

    // physical database
    ["cat", ""],
]);

module.exports = { apiMap }