# TicTacToe Component Documentation

## Component Name
**TicTacToe**

## Purpose
The `TicTacToe` component is a simple tic-tac-toe game for 2 players. It tracks the number of games won by each player until the game is reset.

## Properties
The `TicTacToe` component does not accept any props.

## State Management
The component uses the `useState` hook for managing its state.

## Styling
The component is styled using TailwindCSS. The background of the component is dark gray, and the text is orange. The styling ensures high contrast to meet accessibility visual standards.

## Dependencies
- React
- TailwindCSS

## Usage
- The component renders a 3x3 grid for the tic-tac-toe game.
- Players can click on the grid to place their mark (X or O).
- The game tracks the number of games won by each player until the reset button is clicked.
- The reset button resets the game state and the score.

## Example
```jsx
import TicTacToe from './TicTacToe';

function App() {
  return (
    <div className="app">
      <TicTacToe />
    </div>
  );
}

export default App;
```

## Implementation

```jsx
import React, { useState } from 'react';
import './TicTacToe.css'; // Assuming you have a CSS file for additional styles

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScores((prevScores) => ({
        ...prevScores,
        [winner]: prevScores[winner] + 1,
      }));
      setWinner(winner);
    }
  };

  const calculateWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  return (
    <div className="tic-tac-toe bg-gray-800 text-orange-500 p-4 rounded-lg">
      <div className="scoreboard mb-4">
        <div>Player X: {scores.X}</div>
        <div>Player O: {scores.O}</div>
      </div>
      <div className="board grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <div
            key={index}
            className="cell w-16 h-16 flex items-center justify-center bg-gray-700 text-2xl cursor-pointer"
            onClick={() => handleClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      {winner && <div className="winner mt-4">Winner: {winner}</div>}
      <div className="controls mt-4">
        <button
          className="reset-game bg-orange-500 text-gray-800 px-4 py-2 rounded mr-2"
          onClick={resetGame}
        >
          Reset Game
        </button>
        <button
          className="reset-scores bg-orange-500 text-gray-800 px-4 py-2 rounded"
          onClick={resetScores}
        >
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
```

## Styling with TailwindCSS
Ensure you have TailwindCSS set up in your project. The following classes are used for styling:

- `bg-gray-800`: Dark gray background for the component.
- `text-orange-500`: Orange text color.
- `p-4`: Padding of 4 units.
- `rounded-lg`: Large rounded corners.
- `mb-4`: Margin bottom of 4 units.
- `grid`: CSS grid display.
- `grid-cols-3`: 3 columns in the grid.
- `gap-2`: Gap of 2 units between grid items.
- `w-16`: Width of 16 units.
- `h-16`: Height of 16 units.
- `flex`: Flexbox display.
- `items-center`: Center items vertically.
- `justify-center`: Center items horizontally.
- `bg-gray-700`: Darker gray background for cells.
- `text-2xl`: Extra-large text size.
- `cursor-pointer`: Pointer cursor on hover.
- `mt-4`: Margin top of 4 units.
- `bg-orange-500`: Orange background for buttons.
- `text-gray-800`: Dark gray text color for buttons.
- `px-4`: Padding left and right of 4 units.
- `py-2`: Padding top and bottom of 2 units.
- `rounded`: Rounded corners.
- `mr-2`: Margin right of 2 units.

This setup ensures the component is visually appealing and accessible.