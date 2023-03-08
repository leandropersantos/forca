let screen = document.querySelector("hangman");
let hiddenHangmanButtons = (document.getElementById(
  "buttons-hangman"
).style.display = "none");
let hiddenRestartButton = (document.getElementById(
  "restart-button"
).style.display = "none");
let hiddenQuitButton = (document.getElementById("quit-button").style.display =
  "none");
let divAddMovie = (document.getElementById("add-movie").style.display = "none");
let restartButton = document.getElementById("restart-button");
let quitButton = document.getElementById("quit-button");
let cancelButton = document.getElementById("cancel-button");
let divYouLost = (document.getElementById("youlost").style.display = "none");
let divYouWon = (document.getElementById("youwon").style.display = "none");
let youWonNewGame = document.getElementById("youwonbutton-newgame");
let youLostRestart = document.getElementById("youlostbutton-restart");

var movieList = [
  "pearl",
  "x",
  "tar",
  "aftersun",
  "megan",
  "barbarian",
  "possession",
  "nope",
];
var board = document.getElementById("hangman-canvas").getContext("2d");
var secretMovie = "";
var letters = [];
var correctMovie = "";
var incorrectGuesses = 6;
let incorrectLetters = [];
let amountOfErrors = 6;
let chosenLetter = [];

document.getElementById("start-button").onclick = () => {
  startGame();
};

document.getElementById("save-button").onclick = () => {
  saveMovie();
};

document.getElementById("addmovie-button").onclick = () => {
  showAddMovieScreen();
};

restartButton.addEventListener("click", function () {
  location.reload();
});

quitButton.addEventListener("click", function () {
  location.reload();
});

cancelButton.addEventListener("click", function () {
  location.reload();
});

youWonNewGame.addEventListener("click", function () {
  location.reload();
});

youLostRestart.addEventListener("click", function () {
  location.reload();
});

function movieSelector() {
  let movie = movieList[Math.floor(Math.random() * movieList.length)];
  secretMovie = movie;
  console.log(movie);
  return movie;
}

function verifyClickedLetter(key) {
  if (letters.length < 1 || letters.indexOf(key) < 0) {
    letters.push(key);
    return false;
  } else {
    letters.push(key);
    return true;
  }
}

function addCorrectLetter(i) {
  correctMovie += correctMovie[i];
}

function addIncorrectLetter(letter) {
  if (secretMovie.indexOf(letter) <= 0) {
    incorrectGuesses -= 1;
    console.log(incorrectGuesses);
  }
}

function verifyGameOver(letter) {
  if (chosenLetter.length < secretMovie.length) {
    incorrectLetters.push(letter);

    if (incorrectLetters.length > amountOfErrors) {
      youLost();
    } else if (chosenLetter.length < secretMovie.length) {
      addIncorrectLetter(letter);
      writeIncorrectLetter(letter, incorrectGuesses);
    }
  }
}

// display youWon screen

function youWon() {
  document.getElementById("hangman").style.display = "none";
  document.getElementById("buttons-hangman").style.display = "none";
  document.getElementById("restart-button").style.display = "none";
  document.getElementById("quit-button").style.display = "none";
  document.getElementById("youwon").style.display = "flex";
}

function youLost() {
  document.getElementById("hangman").style.display = "none";
  document.getElementById("buttons-hangman").style.display = "none";
  document.getElementById("restart-button").style.display = "none";
  document.getElementById("quit-button").style.display = "none";
  document.getElementById("youlost").style.display = "block";
}

function verifyWin(letter) {
  chosenLetter.push(letter.toLowerCase());
  if (chosenLetter.length == secretMovie.length) {
    youWon();
  }
}

function verifyLetter(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}

function showAddMovieScreen() {
  document.getElementById("");
  document.getElementById("home-hidden").style.display = "none";
  document.getElementById("hangman").style.display = "none";
  document.getElementById("add-movie").style.display = "block";
}

function saveMovie() {
  let newMovie = document.getElementById("addmovie-input").value;

  if (newMovie !== "") {
    movieList.push(newMovie.toLowerCase());
    alert("O filme foi adicionado");

    document.getElementById("add-movie").style.display = "none";
    startGame();
  } else {
    alert("Você não adicionou nenhum novo filme");
  }
}

function startGame() {
  document.getElementById("home-hidden").style.display = "none";
  document.getElementById("add-movie").style.display = "none";

  drawCanvas();

  movieSelector();

  drawHangStructure();

  drawLines();

  document.getElementById("hangman").style.display = "block";
  document.getElementById("buttons-hangman").style.display = "flex";
  document.getElementById("restart-button").style.display = "block";
  document.getElementById("quit-button").style.display = "block";

  document.onkeydown = (e) => {
    let letter = e.key;

    if (incorrectLetters.length <= amountOfErrors) {
      if (!verifyClickedLetter(e.key) && verifyLetter(e.keyCode)) {
        if (secretMovie.includes(letter)) {
          addCorrectLetter(secretMovie.indexOf(letter));
          for (let i = 0; i < secretMovie.length; i++) {
            if (secretMovie[i] === letter) {
              writeCorrectLetter(i);
              verifyWin(letter);
            }
          }
        } else {
          if (!verifyClickedLetter(e.key) && !verifyWin(letter)) return;
          drawBody(incorrectGuesses);
          verifyGameOver(letter);
        }
      }
    } else {
      alert("Você atingiu o limite de letras incorretas");
    }
  };
}
