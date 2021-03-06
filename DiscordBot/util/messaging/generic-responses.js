let genericResponses = [
    //After
    "Personally, its",
    "Mine is",
    "I'd have to go with",
    "In my opinion, its",
    //Between
    ["I think", "is great"],
    ["It has to be", "by far"],
    //Before
    "has to be mine",
    "is mine",
    "!"
]

let positiveResponses = [
    //After
    "My favorite is",
    "My favorite one is",
    "The best one is",
    "For me, its 100%",
    //Between
    ["I'd have to say", "is up there"],   
    //Before
    "is the BEST!!",
    "is awesome :)",
    "is lit aha",
    "is reallly cool"
]

let negativeResponses = [
    //After
    "Ugh, its",
    "Unfortunately, its",
    "I guess it'd have to be",
    //Between

    //Before
    "is definitely down there",
    "is down there",
    "is not my cup of tea",
    "is pretty meh"
]

let messageModifiers = new Map([
    //positive
    ["favorite", 1],
    ["best", 1],
    ["great", 1],
    ["greatest", 1],
    ["awesome", 1], 
    ["fantastic", 1],

    //negative
    ["worst", -1],
    ["least", -1],
    ["lame", -1],
    ["lamer", -1],
    ["lamest", -1],
    ["garbage", -1],
    ["trash", -1],
]);

let greetings = [
    "Hi", "Hello", "Greetings", "Whats up", "Yo",
    "Salutations", "Welcome", "Good Day", "Nice to meet you",
    "It's nice to meet you", "Hiya", "Hi there",
    "Pleasure to meet you", "It's a pleasure to meet you",
    "Hello there", "Howdy", "Good to see you", "Nice to see you",
    "What's happening", "What's happenin", "What's up", "Hey",
    "Hey there", "Sup", "Wassup"
];

module.exports = {
    genericResponses,
    positiveResponses,
    negativeResponses,
    messageModifiers,
    greetings
}