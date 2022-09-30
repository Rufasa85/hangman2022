var startBtn = document.querySelector("#start-game");
var wordDisplayH2 = document.querySelector("#word-display");
var timeLeftSpan = document.querySelector("#time-left");
var winsSpan = document.querySelector("#wins");
var lossesSpan = document.querySelector("#losses");
var resetBtn = document.querySelector("#reset-scores");

var wordsArr = ["kitten", "puppy", "manatee", "fanatee", "bananatee", "syzygy"];
var chosenWord;
var chosenWordArr;
var guesses = [];
var isPlaying = false;
var timer;
var timeLeft = 10;
var wins = localStorage.getItem("wins") || 0;
var losses = localStorage.getItem("losses") || 0;

winsSpan.textContent = wins;
lossesSpan.textContent = losses;

// Wait for user to click start game, load win /loss from localstorage
startBtn.addEventListener("click", function () {
  if (isPlaying) {
    return;
  }
  console.log("game started!");
  isPlaying = true;
  timeLeft = 10;
  clearInterval(timer);
  // start countdown timer
  timer = setInterval(function () {
    timeLeft--;
    timeLeftSpan.textContent = timeLeft;
    // if time runs out end game as loss
    if (timeLeft === 0) {
      clearInterval(timer);
      isPlaying = false;
      losses++;
      localStorage.setItem("losses", losses);
      lossesSpan.textContent = losses;
      alert("you lose!");
    }
  }, 1000);
  // randomly select staring word
  chosenWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  chosenWordArr = chosenWord.split("");
  console.log(chosenWord, chosenWordArr);
  guesses = [];
  //diplay "_" for each letter in selected word
  for (let i = 0; i < chosenWordArr.length; i++) {
    guesses.push("_");
  }
  wordDisplayH2.textContent = guesses.join(" ");
});
document.addEventListener("keyup", function (event) {
  // once game is started, listen for key strokes
  if (isPlaying) {
    var keyPressed = event.key;
    console.log(keyPressed);
    // if letter in word, display letter instead of "_"
    if (chosenWordArr.includes(keyPressed)) {
      console.log("its in the word!");
      for (let i = 0; i < chosenWordArr.length; i++) {
        if (chosenWordArr[i] === keyPressed) {
          guesses[i] = keyPressed;
        }
      }
      console.log(guesses);
      wordDisplayH2.textContent = guesses.join(" ");
      console.log(chosenWord, guesses.join(""));
      // if all letters showing, end game as win
      if (chosenWord === guesses.join("")) {
        alert("you win!");
        isPlaying = false;
        clearInterval(timer);
        wins++;
        localStorage.setItem("wins", wins);
        winsSpan.textContent = wins;
      }
    }
  }
});

// reset scores in ls when reset button is clicked
resetBtn.addEventListener("click", function () {
  wins = 0;
  losses = 0;
  localStorage.setItem("wins", wins);
  localStorage.setItem("losses", losses);
  winsSpan.textContent = wins;
  lossesSpan.textContent = losses;
});
