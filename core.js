// Screens
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const loseScreen = document.getElementById("lose-screen");

// Buttons
const playButton = document.getElementById("start-screen-play-button");
const playAgainButton = document.getElementById("lose-screen-play-again-button");
const newWordButton = document.getElementById("game-screen-new-button");
const seenWordButton = document.getElementById("game-screen-seen-button");

// HUD
let word = document.getElementById("game-screen-word");
let score = document.getElementById("game-screen-points");
let totalScore = document.getElementById("lose-screen-total-score");

// Configs
let points = 0;
let currentWord = "";
let wordArray = [""];
let wordList = [""];

window.addEventListener("DOMContentLoaded", async() => {
    await fetch("words.txt").then((wordsFile) => {
        return wordsFile.text();
    }).then((words) => {
        wordList = words.split("\n");
    });
});

// Comment lines 21 and 23-29 and uncomment line 32 if you have given up completely.
// let wordList = ["Arduino", "Assembly", "Batchfile", "Brainfuck", "C", "C#", "C++", "COBOL", "CoffeeScript", "Crystal", "CSON", "CSS", "CSV", "Dart", "Electron", "EmberScript", "F#", "GLSL", "Go", "GraphQL", "Haml", "Haskell", "HLSL", "HTML", "Java", "JavaScript", "JSON", "JSX", "Julia", "Kotlin", "Lua", "Makefile", "Markdown", "MATLAB", "NGINX", "Nim", "Nodejs", "Objective-C", "Objective-C++", "Objective-J", "Pascal", "Perl", "PHP", "Pug", "Python", "R", "Rascal", "Ruby", "Rust", "SASS", "SCSS", "Shell", "SQL", "Squirrel", "Swift", "TeX", "TOML", "Turing", "TypeScript", "Visual Basic", "Vue", "XML", "YAML"];

const getRandomWord = () => {
    let randomLine = Math.floor(Math.random() * wordList.length);
    let randomWord = wordList[randomLine];
    currentWord = randomWord.toString(); // ?
    return currentWord;
}

const checkIfWordInArray = (wordToCheck = "") => {
    if (wordArray.includes(wordToCheck)) {
        return true;
    }
}

const startGame = () => {
    word.innerText = getRandomWord();
    score.innerText = "Points: " + points;
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
}

const startGameAfterLost = () => {
    word.innerText = getRandomWord();
    points = 0;
    score.innerText = "Points: " + points;
    loseScreen.style.display = "none";
    gameScreen.style.display = "flex";
}

const lostGame = () => {
    totalScore.innerText = "Total points: " + points;
    wordArray = [""];
    gameScreen.style.display = "none";
    loseScreen.style.display = "flex";
}

const wordSuccess = () => {
    word.innerText = getRandomWord();
    points = points + 1;
    score.innerText = "Points: " + points;
}

playButton.addEventListener("click", () => {
    startGame();
    startScreen.remove();
});

newWordButton.addEventListener("click", () => {
    if (wordArray == [""]) {
        wordArray.push(currentWord);
        wordSuccess();
    }
    else if (!checkIfWordInArray(currentWord)) {
        wordArray.push(currentWord);
        wordSuccess();
    }
    else {
        lostGame();
    }
});

seenWordButton.addEventListener("click", () => {
    if (!checkIfWordInArray(currentWord)) {
        lostGame();
    }
    else {
        wordSuccess();
    }
});

playAgainButton.addEventListener("click", () => {
    startGameAfterLost();
});