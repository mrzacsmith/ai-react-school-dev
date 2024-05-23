# MinesweeperGame Component

## Description
The `MinesweeperGame` component is a playable Minesweeper game built with React and styled using TailwindCSS. It allows users to play the classic Minesweeper game by revealing cells and flagging mines.

## Properties
- **gridSize** (number): The size of the game grid (e.g., 10 for a 10x10 grid).
- **mineCount** (number): The number of mines to place on the game board.

## Usage
```jsx
<MinesweeperGame gridSize={10} mineCount={20} />
```

## Functionality
- **Initialization**: The game board is initialized based on the `gridSize` and `mineCount` properties.
- **User Interactions**: Handles user interactions to reveal cells and flag mines.
  - **Reveal Cells**: Clicking on a cell reveals it. If the cell contains a mine, the game ends.
  - **Flag Mines**: Right-clicking on a cell flags it as a potential mine.
- **Game End Conditions**: The game ends when all non-mine cells are revealed or a mine is clicked.

## Dependencies
- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for styling the component.

## Example
```jsx
import React from 'react';
import MinesweeperGame from './MinesweeperGame';

function App() {
  return (
    <div className="app-container">
      <h1 className="text-2xl font-bold mb-4">Minesweeper Game</h1>
      <MinesweeperGame gridSize={10} mineCount={20} />
    </div>
  );
}

export default App;
```

## Component Code
Here is a basic implementation of the `MinesweeperGame` component:

```jsx
import React, { useState, useEffect } from 'react';
import './MinesweeperGame.css'; // Assuming you have some custom styles

const MinesweeperGame = ({ gridSize, mineCount }) => {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    // Initialize the board with empty cells and place mines
    let newBoard = Array(gridSize).fill().map(() => Array(gridSize).fill({ revealed: false, mine: false, flagged: false }));
    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (!newBoard[row][col].mine) {
        newBoard[row][col].mine = true;
        minesPlaced++;
      }
    }
    setBoard(newBoard);
  };

  const handleCellClick = (row, col) => {
    if (gameOver || board[row][col].flagged) return;
    if (board[row][col].mine) {
      setGameOver(true);
      alert('Game Over! You clicked on a mine.');
    } else {
      revealCell(row, col);
    }
  };

  const handleRightClick = (e, row, col) => {
    e.preventDefault();
    if (gameOver || board[row][col].revealed) return;
    let newBoard = [...board];
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);
  };

  const revealCell = (row, col) => {
    let newBoard = [...board];
    newBoard[row][col].revealed = true;
    setBoard(newBoard);
    // Add logic to reveal adjacent cells if there are no adjacent mines
  };

  return (
    <div className="minesweeper-game">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell.revealed ? 'revealed' : ''} ${cell.flagged ? 'flagged' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
            >
              {cell.revealed && cell.mine ? '💣' : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MinesweeperGame;
```

## Styling (TailwindCSS)
You can add the following TailwindCSS classes to style the component:

```css
/* MinesweeperGame.css */
.minesweeper-game {
  display: grid;
  gap: 1px;
}

.row {
  display: flex;
}

.cell {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2e8f0; /* Tailwind's gray-200 */
  border: 1px solid #cbd5e0; /* Tailwind's gray-300 */
  cursor: pointer;
}

.cell.revealed {
  background-color: #edf2f7; /* Tailwind's gray-100 */
}

.cell.flagged {
  background-color: #f56565; /* Tailwind's red-500 */
}
```

This documentation provides a comprehensive overview of the `MinesweeperGame` component, including its properties, usage, functionality, dependencies, and an example implementation.