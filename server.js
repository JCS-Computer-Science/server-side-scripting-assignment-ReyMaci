const express = require("express");
const uuid = require("uuid")
const server = express();
server.use(express.json())
server.use(express.static("public"))

//All your code goes here
let activeSessions={}

server.get('/newgame', (req,res)=>{
    let newID = uuld.v4()
    let newgame = {
        wordToGuess: "apple",
        guesses:[],
        wrongLetters: [],
        closeLetters: [], //'a' is no longer close because it has been guessed in the correct spot
        rightLetters: [],
        remainingGuesses: 6,
        gameOver: false
    }
})
    
    activeSession[newID] = newGame;
    res.status(201);
    res.send({sessionId: newID});
    //Do not remove this line. This allows the test suite to start
    //multiple instances of your server on different ports
    server.get('/gamestate', (req,res) => {
            
    });
    module.exports = server;
