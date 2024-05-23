import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setScores({
        ...scores,
        [winner]: scores[winner] + 1,
      });
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-orange-500">
      <h1 className="text-4xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-gray-700 text-3xl font-bold flex items-center justify-center border-2 border-gray-600 focus:outline-none"
            onClick={() => handleClick(index)}
            aria-label={`Cell ${index + 1}`}
          >
            {value}
          </button>
        ))}
      </div>
      <button
        className="mb-4 px-4 py-2 bg-orange-500 text-gray-800 font-bold rounded"
        onClick={resetGame}
      >
        Reset
      </button>
      <div className="text-2xl">
        <p>Player X: {scores.X}</p>
        <p>Player O: {scores.O}</p>
      </div>
    </div>
  );
};

export default TicTacToe;