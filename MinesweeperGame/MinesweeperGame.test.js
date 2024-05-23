import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MinesweeperGame from './MinesweeperGame';

test('renders the correct number of cells', () => {
  const { container } = render(<MinesweeperGame gridSize={10} mineCount={20} />);
  const cells = container.querySelectorAll('.cell');
  expect(cells.length).toBe(100);
});

test('places the correct number of mines', () => {
  const { container } = render(<MinesweeperGame gridSize={10} mineCount={20} />);
  const mines = container.querySelectorAll('.cell.mine');
  expect(mines.length).toBe(20);
});

test('reveals a cell when left-clicked', () => {
  const { container } = render(<MinesweeperGame gridSize={10} mineCount={20} />);
  const cell = container.querySelector('.cell');
  fireEvent.click(cell);
  expect(cell).toHaveClass('revealed');
});

test('flags a cell when right-clicked', () => {
  const { container } = render(<MinesweeperGame gridSize={10} mineCount={20} />);
  const cell = container.querySelector('.cell');
  fireEvent.contextMenu(cell);
  expect(cell).toHaveClass('flagged');
});

test('ends the game when a mine is clicked', () => {
  const { container } = render(<MinesweeperGame gridSize={10} mineCount={20} />);
  const mineCell = container.querySelector('.cell.mine');
  fireEvent.click(mineCell);
  expect(container.querySelector('.game-over')).toBeInTheDocument();
});

test('ends the game when all non-mine cells are revealed', () => {
  const { container } = render(<MinesweeperGame gridSize={10} mineCount={20} />);
  const nonMineCells = container.querySelectorAll('.cell:not(.mine)');
  nonMineCells.forEach(cell => fireEvent.click(cell));
  expect(container.querySelector('.game-won')).toBeInTheDocument();
});

test('handles clicking on the first cell being a mine (reinitialize the board)', () => {
  const { container, rerender } = render(<MinesweeperGame gridSize={10} mineCount={20} />);
  const firstCell = container.querySelector('.cell');
  fireEvent.click(firstCell);
  // Assuming the component reinitializes the board if the first cell is a mine
  rerender(<MinesweeperGame gridSize={10} mineCount={20} />);
  const newFirstCell = container.querySelector('.cell');
  expect(newFirstCell).not.toHaveClass('mine');
});

test('handles right-clicking on already revealed cells (no action)', () => {
  const { container } = render(<MinesweeperGame gridSize={10} mineCount={20} />);
  const cell = container.querySelector('.cell');
  fireEvent.click(cell);
  fireEvent.contextMenu(cell);
  expect(cell).not.toHaveClass('flagged');
});
