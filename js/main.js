(() =>  {
  //Variables always fo at the top of the file
var words = ["spider", "arachnid", "trooper", "raven", "design", "chair", "habit", "whale"];

let currentWord = words[Math.floor(Math.random()*words.length)],
    wordDisplay = document.querySelector('.currentWord'),
    letterType = document.querySelector('.selectedLetter'),
    wrongWord = 0,
    correctWord = 0,
    wrongLetters = document.querySelector('.wrong-letters'),
    wrongLetterArray = [];


    function spellWord()
    {
      console.log(this.value);

      if(this.value == "" || this.value.length < 1)
      {
        return;
      }


      let currentWord = this.value;

      if(currentWord.indexOf(this.value) < 0)
      {
        if(wrongWord >= 3)
          {
            console.log('player loses');
            // show game over screen
          }


        else
         {
            wrongLetterArray.push(this.value);
            document.querySelector(`.wrong${wrongWord}`).classList.add('health-loss');
            wrongWord++;
          }
        }


      else
      {
        var matchAgainst = currentWord.split('');
        var letterDisplay = wordDisplay.textContent.split(' ');

        matchAgainst.forEach((letter, index) =>
          {
            if (letter === currentWord)
            {
              wordDisplay[index] = currentWord;
              correctWord++;
              console.log(correctWord);
            }

            if (letterDisplay.includes(currentWord) === true)
            {
              currentWord--
            }

            });

          wordDisplay.textContent = "";
          wordDisplay.textContent = letterDisplay.join(" ");

        if (correctWord === currentWord.length)
        {
          debugger;
            //show victory screen
        }

        }
        letterType.value = "";
        console.log(currentWord);

      }
//resetButton.addEventListener('click', resetGame);

function init()
{
  currentWord = words[Math.floor(Math.random()*words.length)];
  wordDisplay.textContent = currentWord.split("").map(letter => letter = "__").join(" ");
  console.log(currentWord);
}

    letterType.addEventListener('keyup', spellWord);

init();
})();
