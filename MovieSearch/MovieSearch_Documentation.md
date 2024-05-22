# MovieSearch Component Documentation

## Component Name
**MovieSearch**

## Purpose
The `MovieSearch` component allows users to search for movies using the OMDB API and displays the results.

## Properties
This component does not accept any props.

## State Management
The component uses the `useState` hook to manage the following states:
- `query`: Stores the search input value.
- `movies`: Stores the list of movies fetched from the API.
- `loading`: Indicates whether the API request is in progress.
- `error`: Stores any error message from the API request.

## Usage Example
```jsx
import React from 'react';
import MovieSearch from './MovieSearch';

const App = () => {
  return (
    <div>
      <MovieSearch />
    </div>
  );
};

export default App;
```

## Explanation

### 1. State Management
- **`query`**: A string that holds the current search input value.
- **`movies`**: An array that stores the list of movies fetched from the OMDB API.
- **`loading`**: A boolean that indicates whether the API request is currently in progress.
- **`error`**: A string that stores any error message returned from the API request.

### 2. `fetchMovies` Function
This function is responsible for fetching movies from the OMDB API based on the search query. It updates the `movies` state with the fetched data or sets an error message if the request fails.

### 3. `handleSearch` Function
This function is called when the search button is clicked. It triggers the `fetchMovies` function to fetch movies based on the current search query.

### 4. JSX Structure
- A centered container with a search input and button.
- Displays loading text while fetching data.
- Displays an error message if the API request fails.
- Renders a list of movies if the API request is successful.

### 5. Styling
The component uses TailwindCSS classes for styling.

## Component Code
```jsx
import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (query.trim()) {
      fetchMovies();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Search for movies..."
        />
        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      <div className="mt-4 w-full max-w-md">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-bold">{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
```

### Note
Replace `YOUR_API_KEY` with your actual OMDB API key. You can obtain it by signing up at [OMDB API](http://www.omdbapi.com/apikey.aspx).