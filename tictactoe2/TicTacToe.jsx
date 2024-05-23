import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const TicTacToe = () => {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (grid[index] || winner) return;

    const newGrid = grid.slice();
    newGrid[index] = isXNext ? 'X' : 'O';
    setGrid(newGrid);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newGrid);
    if (gameWinner) {
      setWinner(gameWinner);
      setScore((prevScore) => ({
        ...prevScore,
        [gameWinner]: prevScore[gameWinner] + 1,
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
    setGrid(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0 });
    resetGame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-orange-500">
      <h1 className="text-4xl font-bold mb-4">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {grid.map((value, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-gray-700 text-3xl font-bold flex items-center justify-center border-2 border-gray-600"
            onClick={() => handleClick(index)}
            aria-label={`Cell ${index + 1}`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <p className="text-2xl">Next Player: {isXNext ? 'X' : 'O'}</p>
        {winner && <p className="text-2xl">Winner: {winner}</p>}
      </div>
      <div className="mb-4">
        <p className="text-xl">Score</p>
        <p className="text-xl">X: {score.X} - O: {score.O}</p>
      </div>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-gray-700 text-orange-500 font-bold rounded"
          onClick={resetGame}
        >
          Reset Game
        </button>
        <button
          className="px-4 py-2 bg-gray-700 text-orange-500 font-bold rounded"
          onClick={resetScore}
        >
          Reset Score
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;