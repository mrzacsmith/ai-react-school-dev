import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JuneCalendar from './JuneCalendar';

describe('JuneCalendar Component', () => {
  test('renders without crashing', () => {
    render(<JuneCalendar />);
  });

  test('displays all the days of the week (Sunday to Saturday)', () => {
    render(<JuneCalendar />);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test('displays all the dates for the month of June (1 to 30)', () => {
    render(<JuneCalendar />);
    for (let date = 1; date <= 30; date++) {
      expect(screen.getByText(date.toString())).toBeInTheDocument();
    }
  });

  test('uses TailwindCSS classes for styling', () => {
    render(<JuneCalendar />);
    expect(screen.getByText('Sun')).toHaveClass('font-semibold');
    expect(screen.getByText('1')).toHaveClass('p-2 border rounded');
    expect(screen.getByText('Sun').closest('div')).toHaveClass('grid grid-cols-7 gap-2 text-center');
    expect(screen.getByText('1').closest('div')).toHaveClass('grid grid-cols-7 gap-2 text-center');
  });
});
