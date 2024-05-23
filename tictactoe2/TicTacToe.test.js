import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TicTacToe from './TicTacToe'; // Adjust the import based on your file structure

describe('TicTacToe Component', () => {
  test('renders a 3x3 grid for the tic-tac-toe game', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button');
    expect(cells).toHaveLength(9);
  });

  test('players can click on the grid to place their mark (X or O)', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('X');
    fireEvent.click(cells[1]);
    expect(cells[1]).toHaveTextContent('O');
  });

  test('the game correctly tracks the current player\'s turn', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('X');
    fireEvent.click(cells[1]);
    expect(cells[1]).toHaveTextContent('O');
    fireEvent.click(cells[2]);
    expect(cells[2]).toHaveTextContent('X');
  });

  test('the game correctly identifies a win for either player', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins
    const winnerMessage = screen.getByText(/Player X wins!/i);
    expect(winnerMessage).toBeInTheDocument();
  });

  test('the game correctly tracks the number of games won by each player', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins
    const xWins = screen.getByText(/Player X: 1/i);
    expect(xWins).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Reset/i));
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins again
    const xWinsAgain = screen.getByText(/Player X: 2/i);
    expect(xWinsAgain).toBeInTheDocument();
  });

  test('the reset button resets the game state and the score', () => {
    render(<TicTacToe />);
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins
    fireEvent.click(screen.getByText(/Reset/i));
    cells.forEach(cell => {
      expect(cell).toHaveTextContent('');
    });
    const xWins = screen.getByText(/Player X: 0/i);
    const oWins = screen.getByText(/Player O: 0/i);
    expect(xWins).toBeInTheDocument();
    expect(oWins).toBeInTheDocument();
  });

  test('the component has a dark gray background and orange text', () => {
    render(<TicTacToe />);
    const component = screen.getByTestId('tictactoe-component');
    expect(component).toHaveStyle('background-color: darkgray');
    expect(component).toHaveStyle('color: orange');
  });

  test('the component is styled using TailwindCSS with highly contrasting colors to meet accessibility visual standards', () => {
    render(<TicTacToe />);
    const component = screen.getByTestId('tictactoe-component');
    expect(component).toHaveClass('bg-darkgray');
    expect(component).toHaveClass('text-orange');
  });
});
