import React, { useState, useEffect } from 'react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMovies();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Movie Search</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-l"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div>
          {movies.map((movie) => (
            <div key={movie.imdbID} className="mb-2 p-2 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;