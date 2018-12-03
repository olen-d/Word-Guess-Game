// Set up all the variables

let wins = 0;
let guessLimit = 6;
let anyKeyPressed = false;
let blanks = "";
let pos = 0;
let word = "";

let wordList = [
    "analog",
    "artisanal",
    "beards",
    "bronson",
    "Chemex",
    "chipper",
    "clothesline",
    "deck",
    "film",
    "fixie",
    "gentrification",
    "handmade",
    "juicer",
    "kale",
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

        // Todo: Check to see if a letter is entered using regex
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
                indexes.forEach(function(element) {
                    replaceBlank("blank" + element,userInput + " ");
                });

            } else {
                guessLimit--;
                updateGameStats("guesses-remaining",guessLimit);
                //if guesses = 0, game over
            }
            
            
        // Check to see if the word is complete
        }
        
    } else {
        anyKeyPressed = true;
        // Pick a word
        let wordIndex = Math.floor(Math.random() * wordList.length);
        word = wordList[wordIndex];alert(word);
        let wordLength = word.length;

        // Make the blanks
        for (i = 1; i <= wordLength; i++)
            {
            blanks += "<span id=\"blank" + i + "\">_ </span>";
            }
        updateGameStats("blanks",blanks);
        updateGameStats("guesses-remaining",guessLimit);
    }
}