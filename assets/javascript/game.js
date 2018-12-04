// Set up all the variables

let wins = 0;
let guessLimit = 6;
let anyKeyPressed = false;
let blanks = "";
let pos = 0;
let word = ""
let blanksRemaining = 0;

// Set up the list of potential words. Note words can only be letters, numbers and special characters are not allowed.
let wordList = [
    "analog",
    "avacado",
    "artisanal",
    "beards",
    "bronson",
    "Chemex",
    "chipper",
    "clothesline",
    "deck",
    "Doritos",
    "film",
    "fixie",
    "gentrification",
    "handmade",
    "juicer",
    "kale",
    "ninjas",
    "organic",
    "Pabst",
    "Polaroid",
    "pourover",
    "vegan",
    "vinyl"
]; 

let lettersGuessed = [];

function updateGameStats (statistic, value) {
    let elementToUpdate = document.getElementById(statistic);
    elementToUpdate.innerHTML = value;
}

function replaceBlank (blankPosition, letter) {
    let blankToUpdate = document.getElementById(blankPosition);
    blankToUpdate.textContent = letter;
}

// Start the game when the user presses any key

document.onkeyup = function(event) {
    let userInput = event.key;
    if (anyKeyPressed) {

        // Check to see if a letter is entered using regex
        let alphaRe = /[a-z]/;
        if(alphaRe.test(userInput)) {

            // Check to see if the letter has already been guessed
            let letterIndex = lettersGuessed.indexOf(userInput);
            if(letterIndex === -1) {
                // Add the letter to the list of letters guessed and update the letters guessed output
                lettersGuessed.push(userInput);
                updateGameStats("already-guessed",lettersGuessed);

                // Check to see if the letter is correct
                let results = [];
                let indexes = [];
                let re = new RegExp(userInput,"gi");

                while ((results = re.exec(word)) !== null) {
                indexes.push(re.lastIndex);
                }
                
                if (indexes.length > 0) {
                    blanksRemaining = blanksRemaining - indexes.length;
                    indexes.forEach(function(element) {
                        replaceBlank("blank" + element,userInput + " ");
                    });
                    if(blanksRemaining === 0) {
                        // #winning
                        wins++;
                        updateGameStats("game-result","Good Job, You are a Winner!");
                        updateGameStats("win-total",wins);
                        anyKeyPressed = false;
                        }

                } else {
                    guessesRemaining--;
                    updateGameStats("guesses-remaining",guessesRemaining);
                    
                    if (guessesRemaining === 0) {
                        updateGameStats("game-result","Hangman is Over!");
                        anyKeyPressed = false;
                    }
                }
            }
        }
    } else {
        anyKeyPressed = true;

        // Pick a word
        let wordIndex = Math.floor(Math.random() * wordList.length);
        word = wordList[wordIndex];
        wordList.splice(wordIndex, 1);
        let wordLength = word.length;
        blanksRemaining = wordLength;

        // Initialize or reset the game result
        updateGameStats("game-result","");

        // Make the blanks
        blanks = "";    // Clear the blanks in case there was a previous game
        for (i = 1; i <= wordLength; i++)
            {
            blanks += "<span id=\"blank" + i + "\">_ </span>";
            }
        updateGameStats("blanks",blanks);

        // Initialize or reset the guesses remaining
        guessesRemaining = guessLimit;
        updateGameStats("guesses-remaining",guessesRemaining);

        // Clear the letters already guessed
        lettersGuessed.length = 0;
        updateGameStats("already-guessed","");
    }
}