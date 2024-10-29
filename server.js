const express = require("express");
const uuid = require("uuid");
const server = express();
server.use(express.json());
server.use(express.static("public"));

let activeSessions = {};


server.get('/newgame', (req, res) => {
    let newID = uuid.v4();
    let newGame = {
        wordToGuess: "apple",
        guesses: [],
        wrongLetters: [],
        closeLetters: [],
        rightLetters: [],
        remainingGuesses: 6,
        gameOver: false
    };
    activeSessions[newID] = newGame;
    res.status(201).send({ sessionID: newID });
});


server.post('/guess', (req, res) => {
    const { sessionID, letter } = req.body;

    
    const game = activeSessions[sessionID];
    if (!game) {
        return res.status(404).send({ error: "Session not found" });
    }

  
    if (game.guesses.includes(letter) || game.gameOver) {
        return res.status(400).send({ error: "Letter has already been guessed or game is over" });
    }

   
    game.guesses.push(letter);

 
    if (game.wordToGuess.includes(letter)) {
        game.rightLetters.push(letter);
    } else {
        game.wrongLetters.push(letter);
        game.remainingGuesses -= 1;
    }

    
    if (!game.rightLetters.includes(letter) && !game.wrongLetters.includes(letter)) {
        if (game.wordToGuess.split('').some((char) => char === letter)) {
            game.closeLetters.push(letter);
        }
    }

    
    if (game.remainingGuesses <= 0) {
        game.gameOver = true;
    }

    
    const response = {
        wordToGuess: game.wordToGuess,
        guesses: game.guesses,
        wrongLetters: game.wrongLetters,
        closeLetters: game.closeLetters,
        rightLetters: game.rightLetters,
        remainingGuesses: game.remainingGuesses,
        gameOver: game.gameOver
    };

    res.status(201).send(response);
});


server.get('/gamestate', (req, res) => {
    
});


module.exports = server;
