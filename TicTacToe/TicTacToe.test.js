import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TicTacToe from './TicTacToe'; // Adjust the import based on your file structure

describe('TicTacToe Component', () => {
  test('Initial Render: game board, current player, and reset button render correctly', () => {
    render(<TicTacToe />);
    
    // Check if the game board is rendered with 9 cells
    const cells = screen.getAllByRole('button', { name: /cell/i });
    expect(cells).toHaveLength(9);
    
    // Check if the current player is 'X'
    const currentPlayer = screen.getByText(/Current Player: X/i);
    expect(currentPlayer).toBeInTheDocument();
    
    // Check if the reset button is rendered
    const resetButton = screen.getByRole('button', { name: /reset/i });
    expect(resetButton).toBeInTheDocument();
  });

  test('Player Moves: players can make moves and the board updates accordingly', () => {
    render(<TicTacToe />);
    
    const cells = screen.getAllByRole('button', { name: /cell/i });
    
    // Simulate a move by player 'X'
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('X');
    
    // Simulate a move by player 'O'
    fireEvent.click(cells[1]);
    expect(cells[1]).toHaveTextContent('O');
  });

  test('Game Status: game status updates correctly (next player or winner)', () => {
    render(<TicTacToe />);
    
    const cells = screen.getAllByRole('button', { name: /cell/i });
    
    // Simulate moves
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[6]); // X
    
    // Check if the game status updates to show the winner
    const gameStatus = screen.getByText(/Winner: X/i);
    expect(gameStatus).toBeInTheDocument();
  });

  test('Winner Calculation: winner is correctly identified', () => {
    render(<TicTacToe />);
    
    const cells = screen.getAllByRole('button', { name: /cell/i });
    
    // Simulate moves to make 'X' the winner
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[6]); // X
    
    // Check if the winner is correctly identified
    const winner = screen.getByText(/Winner: X/i);
    expect(winner).toBeInTheDocument();
  });

  test('Reset Functionality: reset button clears the board and resets the game state', () => {
    render(<TicTacToe />);
    
    const cells = screen.getAllByRole('button', { name: /cell/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });
    
    // Simulate moves
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    
    // Click the reset button
    fireEvent.click(resetButton);
    
    // Check if the board is cleared
    cells.forEach(cell => {
      expect(cell).toHaveTextContent('');
    });
    
    // Check if the current player is reset to 'X'
    const currentPlayer = screen.getByText(/Current Player: X/i);
    expect(currentPlayer).toBeInTheDocument();
  });
});
