# TicTacToe Component

## Purpose
The TicTacToe component allows two players to play a game of Tic Tac Toe. It tracks the number of games won by each player until the game is reset.

## Properties
This component does not accept any properties.

## State Management
The component uses the `useState` hook to manage the state of the game board, the current player, and the score for each player.

## Styling
The component uses TailwindCSS for styling. It features a dark gray background and orange text to ensure high contrast and accessibility.

## Usage
To use the TicTacToe component, simply import it and include it in your JSX.

```jsx
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

## Accessibility
The component is designed with accessibility in mind, featuring high contrast colors and clear visual indicators.

## Example Implementation

Here is an example implementation of the TicTacToe component:

```jsx
import React, { useState } from 'react';
import './TicTacToe.css'; // Assuming you have a CSS file for additional styles

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
    }
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

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0 });
    resetGame();
  };

  const renderSquare = (index) => {
    return (
      <button
        className="square bg-gray-800 text-orange-500"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="tic-tac-toe">
      <div className="status text-orange-500">{status}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="score text-orange-500">
        <p>Score</p>
        <p>X: {score.X}</p>
        <p>O: {score.O}</p>
      </div>
      <button className="reset-button bg-gray-800 text-orange-500" onClick={resetGame}>
        Reset Game
      </button>
      <button className="reset-button bg-gray-800 text-orange-500" onClick={resetScore}>
        Reset Score
      </button>
    </div>
  );
};

export default TicTacToe;
```

## Additional Notes
- Ensure you have TailwindCSS set up in your project to use the provided classes.
- You can customize the styles further by modifying the TailwindCSS classes or adding additional CSS.
- The component is designed to be simple and easy to use, making it a great addition to any React application.