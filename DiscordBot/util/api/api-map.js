let apiMap = new Map([
    // api normal & word append
    ["pokemon", { URL: "https://pokeapi.co/api/v2/pokemon/", APPEND: "", MAX_RANGE: 898 }],
    ["dog", { URL: "https://api.thedogapi.com/v1/breeds/", APPEND: "", MAX_RANGE: 264 }],
    ["anime", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "", MAX_RANGE: 4260 }],
    ["anime genre", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "", MAX_RANGE: 4260 }],
    ["anime character", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "characters_staff", MAX_RANGE: 4260 }],
    ["anime director", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "characters_staff", MAX_RANGE: 4260 }],
    ["anime va", { URL: "https://api.jikan.moe/v3/anime/", APPEND: "characters_staff", MAX_RANGE: 4260 }],
    ["manga", { URL: "https://api.jikan.moe/v3/manga/", APPEND: "", MAX_RANGE: 797 }],
    ["mangaka", { URL: "https://api.jikan.moe/v3/manga/", APPEND: "", MAX_RANGE: 797 }],
    ["brewery", { URL: "https://api.openbrewerydb.org/breweries/", APPEND: "", MAX_RANGE: 8033}],
    ["quote", { URL: "https://api.quotable.io/random/", APPEND: "", MAX_RANGE: 0}],
    ["cocktail", { URL: "https://www.thecocktaildb.com/api/json/v1/1/random.php", APPEND: "", MAX_RANGE: 0}],
    ["chuck norris", { URL: "https://api.icndb.com/jokes/", APPEND: "", MAX_RANGE: 619 }],
    ["star wars character", { URL: "https://www.swapi.tech/api/people/", APPEND: "", MAX_RANGE: 83 }],
    ["programming joke", { URL: "https://v2.jokeapi.dev/joke/programming/", APPEND: "", MAX_RANGE: 100000}],
    ["got character", { URL: "https://anapioficeandfire.com/api/characters/", APPEND: "", MAX_RANGE: 2138 }],
    ["superhero", { URL: "https://www.superheroapi.com/api.php/10158222866787284/", APPEND: "", MAX_RANGE: 732 }],

    // single json return
    ["taco", { URL: "http://taco-randomizer.herokuapp.com/random/" }],
    ["ron", { URL: "http://ron-swanson-quotes.herokuapp.com/v2/quotes/" }],
    ["swanson", { URL: "http://ron-swanson-quotes.herokuapp.com/v2/quotes/" }],
    ["country", { URL: "https://www.thesportsdb.com/api/v1/json/1/all_countries.php" }],
    ["sport", { URL: "https://www.thesportsdb.com/api/v1/json/1/all_sports.php" }],
    ["trivia", { URL: "https://opentdb.com/api.php?amount=1" }],
    
    // physical database
    ["cat", ""],
    ["holiday", ""],
    ["number", ""],

    // misc
    ["interest", ""],
    ["interests", ""],
    ["chuck", ""],
    ["star", ""],
    ["programming", ""],
    ["game", ""],
    ["got", ""],
    ["super", ""],
    ["i", ""],
]);

module.exports = { apiMap }