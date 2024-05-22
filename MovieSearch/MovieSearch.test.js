import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MovieSearch from './MovieSearch';

// Mock the fetch API
global.fetch = jest.fn();

describe('MovieSearch Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('Initial Render', () => {
    render(<MovieSearch />);
    expect(screen.getByPlaceholderText('Search for a movie')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('Typing in Search Input', () => {
    render(<MovieSearch />);
    const input = screen.getByPlaceholderText('Search for a movie');
    fireEvent.change(input, { target: { value: 'Inception' } });
    expect(input.value).toBe('Inception');
  });

  test('Search Button Click', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: [] }),
    });

    render(<MovieSearch />);
    const input = screen.getByPlaceholderText('Search for a movie');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.click(button);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(fetch).toHaveBeenCalledWith('https://api.example.com/movies?query=Inception'));
  });

  test('API Response Handling - Success', async () => {
    const mockMovies = [{ id: 1, title: 'Inception' }];
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieSearch />);
    const input = screen.getByPlaceholderText('Search for a movie');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.click(button);

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  test('API Response Handling - Failure', async () => {
    fetch.mockRejectedValueOnce(new Error('API is down'));

    render(<MovieSearch />);
    const input = screen.getByPlaceholderText('Search for a movie');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.click(button);

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.getByText('Failed to fetch movies')).toBeInTheDocument();
  });

  test('Rendering Movies List', async () => {
    const mockMovies = [{ id: 1, title: 'Inception' }];
    fetch.mockResolvedValueOnce({
      json: async () => ({ results: mockMovies }),
    });

    render(<MovieSearch />);
    const input = screen.getByPlaceholderText('Search for a movie');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'Inception' } });
    fireEvent.click(button);

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });
});