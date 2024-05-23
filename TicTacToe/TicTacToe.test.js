import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TicTacToe from './TicTacToe'; // Adjust the import based on your file structure

describe('TicTacToe Component', () => {
  test('Initial Render: renders correctly with an empty 3x3 grid and a reset button', () => {
    render(<TicTacToe />);
    
    // Check for 3x3 grid
    const cells = screen.getAllByRole('button', { name: /cell/i });
    expect(cells).toHaveLength(9);
    cells.forEach(cell => expect(cell).toHaveTextContent(''));
    
    // Check for reset button
    const resetButton = screen.getByRole('button', { name: /reset/i });
    expect(resetButton).toBeInTheDocument();
  });

  test('Player Interaction: correct marks (X or O) are placed in the grid', () => {
    render(<TicTacToe />);
    
    const cells = screen.getAllByRole('button', { name: /cell/i });
    
    // Simulate player X click
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('X');
    
    // Simulate player O click
    fireEvent.click(cells[1]);
    expect(cells[1]).toHaveTextContent('O');
  });

  test('Win Detection: winning condition for both players updates the score correctly', () => {
    render(<TicTacToe />);
    
    const cells = screen.getAllByRole('button', { name: /cell/i });
    
    // Simulate a winning condition for player X
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins
    
    const xScore = screen.getByTestId('x-score');
    expect(xScore).toHaveTextContent('1');
    
    // Reset the game
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    // Simulate a winning condition for player O
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[6]); // X
    fireEvent.click(cells[5]); // O wins
    
    const oScore = screen.getByTestId('o-score');
    expect(oScore).toHaveTextContent('1');
  });

  test('Reset Functionality: reset button clears the game board and resets the scores', () => {
    render(<TicTacToe />);
    
    const cells = screen.getAllByRole('button', { name: /cell/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });
    
    // Simulate some moves
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    
    // Click reset button
    fireEvent.click(resetButton);
    
    // Check that the board is cleared
    cells.forEach(cell => expect(cell).toHaveTextContent(''));
    
    // Check that the scores are reset
    const xScore = screen.getByTestId('x-score');
    const oScore = screen.getByTestId('o-score');
    expect(xScore).toHaveTextContent('0');
    expect(oScore).toHaveTextContent('0');
  });

  test('Accessibility: component meets accessibility standards', () => {
    render(<TicTacToe />);
    
    // Check color contrast and focus management
    const cells = screen.getAllByRole('button', { name: /cell/i });
    cells.forEach(cell => {
      expect(cell).toHaveAccessibleName();
      expect(cell).toHaveStyle('color: #000'); // Example check for color contrast
    });
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    expect(resetButton).toHaveAccessibleName();
    expect(resetButton).toHaveFocus();
  });
});