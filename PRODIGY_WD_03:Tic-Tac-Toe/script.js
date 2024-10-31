const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let isAIEnabled = false;
const statusDisplay = document.getElementById('status');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start game in either Human vs Human or Human vs AI mode
function startGame(mode) {
    isAIEnabled = mode === 'ai';
    resetGame();
    statusDisplay.textContent = "It's X's turn";
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] || checkWinner()) return;

    makeMove(cellIndex, currentPlayer);

    if (checkWinner()) {
        statusDisplay.textContent = `${currentPlayer} wins!`;
        return;
    } else if (board.every(cell => cell)) {
        statusDisplay.textContent = `It's a draw!`;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (isAIEnabled && currentPlayer === 'O') {
        statusDisplay.textContent = `AI is making its move...`;
        setTimeout(makeAIMove, 500);
    } else {
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    }
}

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function makeAIMove() {
    const emptyCells = board.map((value, index) => value === null ? index : null).filter(value => value !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex, currentPlayer);

    if (checkWinner()) {
        statusDisplay.textContent = `AI wins!`;
    } else if (board.every(cell => cell)) {
        statusDisplay.textContent = `It's a draw!`;
    } else {
        currentPlayer = 'X';
        statusDisplay.textContent = `It's X's turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    statusDisplay.textContent = "Choose an opponent to start the game";
}
