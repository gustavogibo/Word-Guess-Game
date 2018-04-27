/*

Variables needed for the game:

- Wins
- Losses
- Guesses
- Guesses left
- Letter to be guessed = randomLetter

*/

/*
    Function to make a div appear or disappear
    Arguments:
        statement = 1 - Div Appears
                    2 - Div Disappears
        divName = The div ID that you want to appear/disappear
*/
function toggleDiv(statement, divName) {

    var element = document.getElementById(divName);

    if(statement != 0) {

        element.classList.remove("d-none");

    } else {

        element.classList.add("d-none");

    }
    
}

function changeDivContent(divName, content) {

    var element = document.getElementById(divName);

    element.textContent = content;

}

function displayWordSplit(type, a) {

    var result= "";

    for (let i = 0; i < a.length; i++) {

        if(type == 1) {

            if(i != a.length-1) {

                result+= a[i]+" ";
    
            } else {
    
                result+= a[i];
    
            }

        } else {

            if(i != a.length-1) {

                result+= a[i]+", ";
    
            } else {
    
                result+= a[i];
    
            }
        }

        
           
    }

    return result;

}


var gameContent = {
    wordsArray: ["rock", "country","jazz","blues","eletronic","opera","pop","reggae","rap","funk","instrumental"],
    wins: 0,
    loses: 0,
    guesses: 0,
    guessesLeft: 9,
    words: {
        wordChosen: 0,
        wordSplit:[],
        wordProgress:[],
        lettersGuessed: [],
        checkCorrectLetter: function(letter) {
            
            for (let count = 0; count < this.wordSplit.length; count++) {
                // const element = array[count];

                var position = this.wordSplit.indexOf(letter);
                
                // If the letter is the same as is in the selected index on wordSplit and is not on wordProgress yet
                if(this.wordSplit[count] == letter) {
                    
                    if(position != -1) {

                        if(this.wordProgress[count] == "_") {

                            this.wordProgress[count] = letter;
                            if(this.checkRepeatedLetter(letter) == 0) {

                                this.lettersGuessed.push(letter);
    
                            }
                            changeDivContent("guess-so-far", displayWordSplit(2, this.lettersGuessed));
                            changeDivContent("word-split", displayWordSplit(1, this.wordProgress));
                            changeDivContent("guess-number",gameContent.guesses);
                            changeDivContent("guess-left", gameContent.guessesLeft);

                        }

                    } else {
                        
                        this.lettersGuessed.push(letter);
                        gameContent.guesses++;
                        gameContent.guessesLeft--;
                        changeDivContent("guess-so-far", displayWordSplit(2, this.lettersGuessed));
                        changeDivContent("guess-number",gameContent.guesses);
                        changeDivContent("guess-left", gameContent.guessesLeft);

                        var audio = new Audio('assets/sounds/doh.mp3');
                        audio.play();

                    }

                } else {
                    
                    if(this.checkRepeatedLetter(letter) == 0) {

                        this.lettersGuessed.push(letter);
                        gameContent.guesses++;
                        gameContent.guessesLeft--;

                    }
                    changeDivContent("guess-so-far", displayWordSplit(2, this.lettersGuessed));
                    changeDivContent("guess-number",gameContent.guesses);
                    changeDivContent("guess-left", gameContent.guessesLeft);

                    var audio = new Audio('assets/sounds/doh.mp3');
                    audio.play();

                }
                
            }
            
    
        },
        checkRepeatedLetter: function(letter) {
            
            var check = this.lettersGuessed.indexOf(letter);

            if(check != -1) {

                return 1;

            } else {

                return 0;
            }

        },
    },
    resetGame: function() {

        guesses = 0;
        guessesLeft = 9;

        //Randomly choose an music genre
        // gameContent.words.wordChosen = gameContent.wordsArray[Math.floor(Math.random() * gameContent.wordsArray.length)];
        this.words.wordChosen = this.wordsArray[Math.floor(Math.random() * this.wordsArray.length)];
        this.words.wordChosen = "eletronic";
        //Transforming the word into Underscores
        this.words.wordSplit = this.words.wordChosen.split("");

        //Changing the div#word-split content to the Underscore characters
        for (let i = 0; i < this.words.wordChosen.length; i++) {
            this.words.wordProgress[i] = "_";
        }

        // Changing the div for the new word with the underscores instead of the letters
        changeDivContent("word-split", displayWordSplit(1, gameContent.words.wordProgress));


    }
    
};

// Declaring Wins, Losses, Guesses and Actual Guesses
var wins = 0;
var losses = 0;
var guesses = 0;
var guessesLeft = 9;
var guessList = [];
var printGuessList = "";

var divWin = document.getElementById("user-wins");
var divLoss = document.getElementById("user-losses");
var divGuess = document.getElementById("guess-number");
var divGuessLeft = document.getElementById("guess-left");
var divGuessSoFar = document.getElementById("guess-so-far");

var instructions = "Instructions"+
                    "\n"+
                    "1 - The computer will choose randomly a letter"+
                    "\n"+
                    "2 - Type the letter that you think the computer chose."+
                    "\n"+
                    "3 - If you guess the wrong letter, you'll miss a guess. You have only 9 guesses."+
                    "\n"+
                    "4 - If you miss all your guesses, game over! You can start a new game though. Just press Ok as the new alert appears."+
                    "If you win, something good awaits for you. Good Luck!"+
                    "\n"+
                    "Hint: Use headphones!";


//Alert(instructions);

gameContent.resetGame();

changeDivContent("word-split", displayWordSplit(1, gameContent.words.wordProgress));

document.onkeyup = function(event) {

    var userGuess = event.key;
        userGuess = userGuess.toLowerCase();

    if (event.keyCode >= 65 && event.keyCode <= 90) {
        
        gameContent.words.checkCorrectLetter(userGuess);

    }

};

// console.log(randomLetter);

