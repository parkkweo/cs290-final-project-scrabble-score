//Scrabble score lookup table
const scrabbleScores = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

//Current game state
let currentScore = 0;
let previousWords = [];

//Function to initializes the game state
function newGame() {
  currentScore = 0;
  previousWords = [];
  clearWordInput();
  updateDisplay();
}

//Function to calculate the score of a word
function calculateScore(word) {
  return word
    .toUpperCase()
    .split("")
    .reduce((score, letter) => {
      return score + (scrabbleScores[letter] || 0);
    }, 0);
}

//Function to calculates and displays scores in real time when a word is entered
function updateValueOutput() {
  const wordInput = document.querySelector(".word-input").value;
  const wordScore = calculateScore(wordInput);
  document.querySelector(".value-output").textContent = wordScore;
}

//Function to update the displayed score and previous words
function updateDisplay() {
  const scoreOutput = document.querySelector(".score-output");
  scoreOutput.textContent = currentScore;
  const wordOutput = document.querySelector(".word-output");
  wordOutput.innerHTML = previousWords
    .map((word) => `<span style="margin-right: 4px; line-height: 24px;">${word}</span>`)
    .join("");
}

//Function to add word to previous words and update score
function playWord() {
  const wordInput = document.querySelector(".word-input").value;
  const wordScore = calculateScore(wordInput);
  currentScore += wordScore;
  previousWords.unshift(wordInput);
  updateDisplay();
  clearWordInput();
}

//Function to clear word input
function clearWordInput() {
  document.querySelector(".word-input").value = "";
  document.querySelector(".value-output").textContent = "";
}

//Function to finish the game
function finishGame() {
  // sends data to server
  fetch("/indexData", {
    method: "POST",
    body: JSON.stringify({
      score: currentScore,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (res) {
      if (res.status === 200) {
        console.log("sent to server successfully");
      } else alert("An error occurred communicating with the server: " + res.status);
    })
    .catch(function (err) {
      alert("An error occurred communicating with the server: " + err);
    });

  currentScore = 0;
  previousWords = [];
  updateDisplay();
}

//Event listeners
document
  .querySelector(".word-input")
  .addEventListener("input", updateValueOutput);
document.getElementById("new-game-button").addEventListener("click", newGame);
document.getElementById("play-word-button").addEventListener("click", playWord);
document
  .getElementById("discard-button")
  .addEventListener("click", clearWordInput);
document
  .getElementById("finish-game-button")
  .addEventListener("click", finishGame);

//Initialize the game display
updateDisplay();
