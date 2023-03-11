const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector(
  '[data-winning-message-text]'
);
const restartButton = document.getElementById('restartButton');
let circleTurn;
const info = document.getElementById('info');
const PLAYER1 = 'Player one';
const PLAYER2 = 'Player two';

startGame();

restartButton.addEventListener('click', () => startGame());

function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });

  setBoardHoverClass();

  winningMessageElement.classList.remove('show');
  info.innerText = `${PLAYER1} go`;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  const currentPlayerTurn = circleTurn ? PLAYER1 : PLAYER2;

  placeMark(cell, currentClass, currentPlayerTurn);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    info.innerText = 'Draw!';
    winningMessageTextElement.innerText = info.innerText;
  } else {
    info.innerText = `${circleTurn ? PLAYER2 : PLAYER1} Wins!`;
    winningMessageTextElement.innerText = info.innerText;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass, currentPlayerTurn) {
  cell.classList.add(currentClass);
  info.innerText = `${currentPlayerTurn} go`;
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS);
}

function checkWin(currClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currClass);
    });
  });
}
