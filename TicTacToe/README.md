# TicTacToe Component Documentation

## Component Name: TicTacToe

### Purpose
The `TicTacToe` component is a simple tic-tac-toe game designed for 2 players. It allows players to take turns marking cells in a 3x3 grid until one player wins or the game ends in a draw.

### Properties
This component does not accept any props.

### State Management
The component uses the `useState` hook to manage the following states:
- `board`: An array of 9 elements representing the 3x3 grid.
- `currentPlayer`: Tracks the current player ('X' or 'O').
- `status`: Displays the current game status (next player or winner).

### Styling
TailwindCSS is used for styling the game board, buttons, and overall layout.

### Dependencies
- React
- TailwindCSS

### Default Content
- A 3x3 grid representing the game board.
- A reset button to start a new game.
- A display for the current player and game status.

### User Interactions
- Players can click on the cells to make a move.
- Players can click the reset button to start a new game.

## Explanation

### State Management
1. **`board`**: An array of 9 elements representing the 3x3 grid.
2. **`currentPlayer`**: Tracks the current player ('X' or 'O').
3. **`status`**: Displays the current game status (next player or winner).

### Functions
1. **`handleClick(index)`**: Handles cell clicks, updates the board, and checks for a winner.
2. **`handleReset()`**: Resets the game to its initial state.
3. **`renderCell(index)`**: Renders a single cell in the grid.

### Winner Calculation
**`calculateWinner(squares)`**: Determines if there's a winner based on the current board state.

### Styling
TailwindCSS classes are used for styling the grid, buttons, and overall layout.

## Usage
Import and use the `TicTacToe` component in your main application file (e.g., `App.js`) to render it.

### Example
```jsx
import React from 'react';
import TicTacToe from './TicTacToe';

function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}

export default App;
```

## Component Code
Here is the complete code for the `TicTacToe` component:

```jsx
import React, { useState } from 'react';
import './tailwind.css'; // Ensure TailwindCSS is properly imported

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [status, setStatus] = useState('Next player: X');

  const handleClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(board) || newBoard[index]) {
      return;
    }
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const winner = calculateWinner(newBoard);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      setStatus(`Next player: ${nextPlayer}`);
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setStatus('Next player: X');
  };

  const renderCell = (index) => {
    return (
      <button
        className="w-16 h-16 border border-gray-400 text-2xl"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, index) => renderCell(index))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleReset}
      >
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
```

### Notes
- Ensure TailwindCSS is properly set up in your project.
- The `tailwind.css` file should be imported in your project to apply the styles.

This documentation provides a comprehensive guide to using and understanding the `TicTacToe` component.