function drawCanvas() {
  board.lineWidth = 3;
  board.lineCap = "round";
  board.lineJoin = "round";
  board.fillStyle = "#bdfb5d";
  board.fillRect(0, 0, 315, 439);
  // board.stroke();
  // board.closePath();
}

function drawHangStructure() {
  board.strokeStyle = "#5c49f0";
  board.beginPath();
  board.moveTo(50, 265);
  board.lineTo(265, 265);
  board.lineWidth = 15;
  board.stroke();

  // Desenha o poste da estrutura da forca
  board.beginPath();
  board.moveTo(80, 265);
  board.lineTo(80, 50);
  board.lineWidth = 15;
  board.stroke();

  // Desenha a travessa superior da estrutura da forca
  board.beginPath();
  board.moveTo(80, 50);
  board.lineTo(157.5, 50);
  board.lineWidth = 15;
  board.stroke();

  // Desenha a travessa inferior da estrutura da forca
  board.beginPath();
  board.moveTo(157.5, 50);
  board.lineTo(157.5, 80);
  board.lineWidth = 5;
  board.stroke();
}

function drawLines() {
  board.clearRect(0, 434, 375, 8);
  board.fillStyle = "#5c49f0";
  // board.beginPath();
  let width = 375 / secretMovie.length;
  for (let i = 0; i < secretMovie.length; i++) {
    board.fillRect(i * width + 10, 434, width - 20, 8);
  }
}

function writeCorrectLetter(index) {
  board.font = "bold 42px Inter, sans-serif";
  board.fillStyle = "#5c49f0";
  let width = 375 / secretMovie.length;
  board.fillText(secretMovie[index], 12 + width * index, 430);
}

function writeIncorrectLetter(letter, errorsLeft) {
  board.lineWidth = 6;
  board.font = "bold 40px Inter, sans-serif";
  board.lineCap = "round";
  board.lineJoin = "round";
  board.fillStyle = "#CA5CFA";
  board.fillText(letter, 25 * (10 - errorsLeft), 326, 315, 80);
}

function drawBody(incorrectGuesses) {
  board.lineWidth = 8;
  board.lineCap = "round";
  board.lineJoin = "round";
  board.strokeStyle = "#5c49f0";
  board.fillStyle = "#5c49f0";
  if (incorrectGuesses === 6) {
    //cabeça
    board.beginPath();
    board.arc(157.5, 100, 25, 0, 2 * Math.PI);
    board.fill();
    board.closePath();
  }
  if (incorrectGuesses === 4) {
    //torso
    board.beginPath();
    board.moveTo(157.5, 125);
    board.lineTo(157.5, 200);
    board.lineWidth = 12;
    board.stroke();
    board.closePath();
  }
  if (incorrectGuesses === 3) {
    //braço esquerdo
    board.beginPath();
    board.moveTo(157.5, 125);
    board.lineTo(117.5, 150);
    board.lineWidth = 12;
    board.stroke();
    board.closePath();
  }
  if (incorrectGuesses === 2) {
    //braço direito
    board.beginPath();
    board.moveTo(157.5, 125);
    board.lineTo(197.5, 150);
    board.lineWidth = 12;
    board.stroke();
    board.closePath();
  }
  if (incorrectGuesses === 1) {
    // perna esquerda
    board.beginPath();
    board.moveTo(157.5, 200);
    board.lineTo(117.5, 240);
    board.lineWidth = 12;
    board.stroke();
    board.closePath();
  }
  if (incorrectGuesses === 0) {
    //perna direita
    board.beginPath();
    board.moveTo(157.5, 200);
    board.lineTo(197.5, 240);
    board.lineWidth = 12;
    board.stroke();
    board.closePath();
  }
}
