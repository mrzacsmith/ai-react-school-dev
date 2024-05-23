import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure TailwindCSS is imported in your main CSS file

const MinesweeperGame = ({ gridSize, mineCount }) => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    let newBoard = Array(gridSize).fill().map(() => Array(gridSize).fill({
      revealed: false,
      flagged: false,
      mine: false,
      adjacentMines: 0
    }));

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (!newBoard[row][col].mine) {
        newBoard[row][col].mine = true;
        minesPlaced++;
      }
    }

    // Calculate adjacent mines
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!newBoard[row][col].mine) {
          newBoard[row][col].adjacentMines = countAdjacentMines(newBoard, row, col);
        }
      }
    }

    setBoard(newBoard);
  };

  const countAdjacentMines = (board, row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],         [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    let count = 0;
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && board[newRow][newCol].mine) {
        count++;
      }
    });
    return count;
  };

  const handleCellClick = (row, col) => {
    if (gameOver || gameWon || board[row][col].flagged) return;

    if (board[row][col].mine) {
      setGameOver(true);
      revealBoard();
    } else {
      revealCell(row, col);
      checkWin();
    }
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    if (gameOver || gameWon || board[row][col].revealed) return;

    const newBoard = [...board];
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);
  };

  const revealCell = (row, col) => {
    if (board[row][col].revealed || board[row][col].flagged) return;

    const newBoard = [...board];
    newBoard[row][col].revealed = true;
    setBoard(newBoard);

    if (newBoard[row][col].adjacentMines === 0) {
      const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
      ];
      directions.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;
        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
          revealCell(newRow, newCol);
        }
      });
    }
  };

  const revealBoard = () => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell, revealed: true })));
    setBoard(newBoard);
  };

  const checkWin = () => {
    const allCellsRevealed = board.every(row => row.every(cell => cell.revealed || cell.mine));
    if (allCellsRevealed) {
      setGameWon(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Minesweeper</h1>
      {gameOver && <div className="text-red-500 mb-4">Game Over!</div>}
      {gameWon && <div className="text-green-500 mb-4">You Win!</div>}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 2rem)` }}>
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-8 h-8 border flex items-center justify-center cursor-pointer ${cell.revealed ? 'bg-gray-300' : 'bg-gray-500'} ${cell.flagged ? 'bg-yellow-500' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
            >
              {cell.revealed && cell.mine && '💣'}
              {cell.revealed && !cell.mine && cell.adjacentMines > 0 && cell.adjacentMines}
              {cell.flagged && !cell.revealed && '🚩'}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default MinesweeperGame;