// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '1d1eaf0c56aa42a80a188a73258317b1';
const API_URL = `https://api.themoviedb.org/3`;

function App() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [recent, setRecent] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTopRatedMovies();
    fetchPopularMovies();
    fetchRecentMovies();
  }, []);

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(`${API_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: query,
        },
      });
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch movies.');
    }
  };

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movie/top_rated`, {
        params: {
          api_key: API_KEY,
        },
      });
      setTopRated(response.data.results);
    } catch (err) {
      setError('Failed to fetch top-rated movies.');
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
        },
      });
      setPopular(response.data.results);
    } catch (err) {
      setError('Failed to fetch popular movies.');
    }
  };

  const fetchRecentMovies = async () => {
    try {
      const response = await axios.get(`${API_URL}/movie/latest`, {
        params: {
          api_key: API_KEY,
        },
      });
      setRecent([response.data]);
    } catch (err) {
      setError('Failed to fetch recent movies.');
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      fetchMovies(search);
    }
  };

  const handleFavorite = (movie) => {
    setFavorites([...favorites, movie]);
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="bg-blue-500 p-4">
        <h1 className="text-4xl font-bold text-center">Movie Recommendation</h1>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 rounded bg-white text-black placeholder-gray-700"
              placeholder="Search for movies..."
            />
            <button
              onClick={handleSearch}
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {/* Error Handling */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Movie Sections */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Top Rated Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {topRated.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 p-4 rounded shadow-md cursor-pointer"
                  onClick={() => handleSelectMovie(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded mb-2"
                  />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-gray-500">Rating: {movie.vote_average}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(movie);
                    }}
                    className="mt-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                  >
                    Add to Favorites
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Popular Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {popular.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 p-4 rounded shadow-md cursor-pointer"
                  onClick={() => handleSelectMovie(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded mb-2"
                  />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-gray-500">Rating: {movie.vote_average}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(movie);
                    }}
                    className="mt-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                  >
                    Add to Favorites
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Recently Released Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {recent.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-gray-800 p-4 rounded shadow-md cursor-pointer"
                  onClick={() => handleSelectMovie(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto rounded mb-2"
                  />
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-gray-500">Rating: {movie.vote_average}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(movie);
                    }}
                    className="mt-2 bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                  >
                    Add to Favorites
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Movie Details Modal */}
          {selectedMovie && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
              <div className="bg-gray-800 p-6 rounded shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-bold mb-4">{selectedMovie.title}</h2>
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="w-full h-auto rounded mb-4"
                />
                <p className="text-lg mb-4">{selectedMovie.overview}</p>
                <p className="text-gray-500 mb-4">Release Date: {selectedMovie.release_date}</p>
                <p className="text-gray-500 mb-4">Rating: {selectedMovie.vote_average}</p>
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
