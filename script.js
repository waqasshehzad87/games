const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'x';

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', () => {
  location.reload();
});

function handleClick(e) {
  const cell = e.target;
  cell.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    message.textContent = `${currentPlayer.toUpperCase()} Wins!`;
    endGame();
  } else if (isDraw()) {
    message.textContent = "Draw!";
    endGame();
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  }
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}

function checkWin(player) {
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winCombos.some(combo => {
    return combo.every(index => cells[index].classList.contains(player));
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}
