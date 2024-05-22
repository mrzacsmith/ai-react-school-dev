import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InfoSection from './InfoSection'; // Adjust the import path as necessary

describe('InfoSection Component', () => {
  test('renders title "Lorem Ipsum"', () => {
    render(<InfoSection />);
    const titleElement = screen.getByText(/Lorem Ipsum/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders two paragraphs with specific text', () => {
    render(<InfoSection />);
    const paragraphElements = screen.getAllByText(/Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.|Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum./i);
    expect(paragraphElements.length).toBe(2);
  });

  test('renders a button with text "Visit Us Now" and 1/3 width', () => {
    render(<InfoSection />);
    const buttonElement = screen.getByText(/Visit Us Now/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('w-1/3');
  });

  test('button click interaction', () => {
    render(<InfoSection />);
    const buttonElement = screen.getByText(/Visit Us Now/i);
    fireEvent.click(buttonElement);
    // Since there's no specific action, we just ensure the button is clickable
    expect(buttonElement).toBeInTheDocument();
  });
});