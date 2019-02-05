// Set up all the variables

let wins = 0;
let guessLimit = 6;
let anyKeyPressed = false;
let blanks = "";
let pos = 0;
let word = ""
let wordLength = 0;
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
    "jazz",
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

function getBlankContent (blankPosition) {
    let blankResult = document.getElementById(blankPosition).textContent;
    return blankResult;
}

function swapImage (oldImageId, newImageSrc) {
    let imageToSwap = document.getElementById(oldImageId);
    imageToSwap.src = newImageSrc;
}

// Start the game when the user presses any key

document.onkeyup = function(event) {
    let userInput = event.key.toLowerCase();
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
                        document.getElementById("game-result").style.color = "#718831";
                        updateGameStats("game-result","Good Job, You are a Winner!");
                        updateGameStats("win-total",wins);
                        updateGameStats("initiate-game","Press any key to play again.");
                        anyKeyPressed = false;
                        }

                } else {
                    guessesRemaining--;
                    updateGameStats("guesses-remaining",guessesRemaining);
                    
                    if (guessesRemaining === 0) {
                        document.getElementById("game-result").style.color = "#c94716";
                        updateGameStats("game-result","Hangman is Over!");
                        swapImage("game-image","assets/images/over.gif");
                        updateGameStats("initiate-game","Press any key to play again.");

                        // Reveal the answer - this wasn't part of the original brief, but was suggested during UX testing
                        for (i = 0; i < wordLength; i++) {
                            let j = i + 1;

                            // check to see if the item is a blank
                            blankContent = getBlankContent("blank" + j);
                            blankContent = blankContent.charAt(0);
                            if(blankContent === "_") {
                                replaceBlank("blank" + j,word.charAt(i) + " ");
                                document.getElementById("blank" + j).style.color = "#c94716";
                            } 
                        }
                        anyKeyPressed = false;
                    }
                }
            }
        }
    } else {
        anyKeyPressed = true;

        // Pick a word, but first check to see if any are left
        if(wordList.length === 0) {
            updateGameStats("game-result","Congratulations, You Have Used all the Words!");
            }

        let wordIndex = Math.floor(Math.random() * wordList.length);
        word = wordList[wordIndex];
        wordList.splice(wordIndex, 1);
        wordLength = word.length;
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

        // Reset the image
        swapImage("game-image","assets/images/hipster.jpg");
    }
}