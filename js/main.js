(() => {
  //Variables always fo at the top of the file
var words = ["box", "fight", "computer", "raven", "design", "chair", "habit", "whale"];

let currentWord = words[Math.floor(Math.random()*words.length)],
    wordHint = document.querySelector('.currentWord'),
    guessBox = document.querySelector('.selectedLetter'),
    wrongGuesses = 0,
    correctGuesses = 0,
    resetScreen = document.querySelector('.reset-screen'),
    resetButton = resetScreen.querySelector('button'),
    wrongLetters = document.querySelector('.wrong-letters'),
    wrongLetterArray = []; //2 square brackets means array.

//functions goes in the middle (logic, etc)
function showResetScreen(message) {
  resetScreen.classList.add('show-piece');
  resetScreen.querySelector('h3').textContent = message;
}

function resetGame() {
  wrongGuesses = 0;
  correctGuesses = 0;
  wrongLetters.textContent = "";
  guessBox.value = "";
  wrongLetterArray = [];
  let gamePieces = Array.from(document.querySelectorAll('.show-piece'));
  gamePieces.forEach(piece => piece.classList.remove('show-piece'));
  init();
}

function makeGuess() {
  console.log(this.value);
  //If there is no letter, exit the game loop => MDN or
  if (this.value == "" || this.value.length < 1 ) {
    return;
  }
  let currentGuess = this.value;

  // set up the path trought the app, return the number of the location 0 = not in the word - This is the losing path
  if (currentWord.indexOf(this.value) < 0) {
  //track wrong answer
    if (wrongGuesses >= 6) {
      console.log('you lose!');
      showResetScreen("Game Over");
    } else {
      wrongLetterArray.push(this.value);//push letter to Array
      wrongLetters.textContent = wrongLetterArray.join(" ");
      document.querySelector(`.wrong${wrongGuesses}`).classList.add('show-piece');
    // increment the wrong with SVG
      wrongGuesses++;
    }

} else { //This else matches the if on line 37
  // person choose correct letter
  // split the current word into an arrw so we can check the letter where the guess matches
  var matchAgainst = currentWord.split('');
  var hintString = wordHint.textContent.split(' '); // split on the characters not the underscores

  // loop through the current word and check each letters
  matchAgainst.forEach((letter, index) => {
    if (letter === currentGuess) {
      hintString[index] = currentGuess;
      correctGuesses++
    }
    if (hintString.includes(currentGuess) === true) {
      currentGuess--
    }

  });
  wordHint.textContent = "";
  wordHint.textContent = hintString.join(" ");

  if (correctGuesses === currentWord.length) {
    showResetScreen("You won!");
  }

  }
  guessBox.value = "";
  console.log(currentWord);
}
resetButton.addEventListener('click', resetGame);

//Function to Initialize the Game. At start do this:
function init() {
  //Generate a random number and grab the corresponded word in the word array.
  currentWord = words[Math.floor(Math.random()*words.length)];
  wordHint.textContent = currentWord.split("").map(letter => letter = "__").join(" ");
}
// event handling goes at the bottom.
guessBox.addEventListener('keyup', makeGuess);
resetButton.addEventListener('click', resetGame);

init();
})();
