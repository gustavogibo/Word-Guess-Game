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
        resetGame: function() {

            gameContent.guesses = 0;
            gameContent.guessesLeft = 9;
            this.lettersGuessed.length = 0;
    
            //Randomly choose an music genre
            // gameContent.words.wordChosen = gameContent.wordsArray[Math.floor(Math.random() * gameContent.wordsArray.length)];
            this.wordChosen = gameContent.wordsArray[Math.floor(Math.random() * gameContent.wordsArray.length)];
            // this.wordChosen = "eletronic";
            //Transforming the word into Underscores
            this.wordSplit = this.wordChosen.split("");
    
            changeDivContent("guess-so-far", "---");
            changeDivContent("guess-number", 0);
            changeDivContent("guess-left", 9);
    
            //Changing the div#word-split content to the Underscore characters
            for (let i = 0; i < this.wordChosen.length; i++) {
                this.wordProgress[i] = "_";
            }
    
            // Changing the div for the new word with the underscores instead of the letters
            changeDivContent("word-split", displayWordSplit(1, this.wordProgress));

            changeDivContent("guess-so-far", "---");
    
    
    
        },
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

                                // var audio = new Audio('assets/sounds/doh.mp3');
                                // audio.play();
    
                            }
                            changeDivContent("guess-so-far", displayWordSplit(2, this.lettersGuessed));
                            changeDivContent("word-split", displayWordSplit(1, this.wordProgress));
                            changeDivContent("guess-number",gameContent.guesses);
                            changeDivContent("guess-left", gameContent.guessesLeft);

                            position = this.wordProgress.indexOf("_");

                            if(position == -1) {

                                gameContent.wins++;
                                changeDivContent("user-wins", gameContent.wins);
                                changeDivContent("misterious-word", this.wordChosen);
                                toggleDiv(1, "box-victory");
                                var audio = new Audio('assets/sounds/ff7.mp3');
                                audio.play();
                                this.resetGame();

                            }

                            

                        }

                    } else {
                        
                        this.lettersGuessed.push(letter);
                        gameContent.guesses++;
                        gameContent.guessesLeft--;

                        if (gameContent.guessesLeft == 0) {
                            
                            this.resetGame();

                            losses++;
                            changeDivContent("user-losses", losses);

                            alert("Game over! Try again!");
                            
                            var audio = new Audio('assets/sounds/loss.mp3');
                            audio.play();

                            return 0;
                            

                        } else {

                            changeDivContent("guess-so-far", displayWordSplit(2, this.lettersGuessed));
                            changeDivContent("guess-number",gameContent.guesses);
                            changeDivContent("guess-left", gameContent.guessesLeft);

                            


                        }

                    }

                } else {
                    
                    if(count == this.wordSplit.length-1) {

                        if(this.checkRepeatedLetter(letter) == 0) {

                            this.lettersGuessed.push(letter);
                            gameContent.guesses++;
                            gameContent.guessesLeft--;

                            if (gameContent.guessesLeft == 0) {
                                
                                this.resetGame();
                                var audio = new Audio('assets/sounds/loss.mp3');
                                audio.play();
                                losses++;
                                changeDivContent("user-losses", losses);
                                alert("Game over! Try again!");


                                
                                return 0;
    
                            } else {

                            // console.log('3');
                            var audio = new Audio('assets/sounds/doh.mp3');
                            audio.play();

                        }
                        changeDivContent("guess-so-far", displayWordSplit(2, this.lettersGuessed));
                        changeDivContent("guess-number",gameContent.guesses);
                        changeDivContent("guess-left", gameContent.guessesLeft);

                    }

                    }

                    

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
    }
    
};

// Declaring Wins, Losses, Guesses and Actual Guesses
var wins = 0;
var losses = 0;
var guesses = 0;
var guessesLeft = 9;

gameContent.words.resetGame();

changeDivContent("word-split", displayWordSplit(1, gameContent.words.wordProgress));

document.onkeyup = function(event) {

    var userGuess = event.key;
        userGuess = userGuess.toLowerCase();

    if (event.keyCode >= 65 && event.keyCode <= 90) {
        
        gameContent.words.checkCorrectLetter(userGuess);

    }

};

// console.log(randomLetter);

