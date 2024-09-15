import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faInfoCircle, faWrench, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { faLinkedin, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons'; // Import social icons



function HeaderListItem({ itemName, link }) {
  return (
    <a href={link}> <li className="cursor-pointer p-3 text-lg rounded-lg transition-colors hover:bg-gradient-to-r from-blue-500 to-blue-700 duration-300 delay-150 ease-in-out hover:text-white">
      {itemName}
    </li>
    </a>
  );
}

function FavouriteMovies({ favouriteMovies, setFavouriteMovies }) {
  // Remove a movie from favorites
  const removeFavouriteMovie = (movieId) => {
    const updatedMovies = favouriteMovies.filter((movie) => movie.id !== movieId);
    setFavouriteMovies(updatedMovies);
  };

  return (
    <div className="py-10">
      <h2 className="text-4xl text-white font-bold text-center mb-8" id="fav">Favourite Movies</h2>
      {favouriteMovies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favouriteMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-row">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="flex items-center w-5/12 h-64 object-cover transition-transform duration-300 transform hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                <p className="text-gray-400 mb-4">{movie.release_date}</p>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all duration-300"
                  onClick={() => removeFavouriteMovie(movie.id)}
                >
                  Remove from Favourites
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center text-lg">No favourite movies added yet.</p>
      )}
    </div>
  );
}

function Header() {
  const [isActive, setActive] = useState(false);

  return (
    <div className="bg-gradient-to-b from-black to-gray-900">
      <header className="font-semibold text-2xl text-white">
        <div className="py-4 border-b-2 border-blue-500">
          <div className="flex flex-row justify-between items-center">
            <h1 className="py-2 px-4 text-white">
              Movie<span className="text-blue-500">Mingle</span>
            </h1>
            <ul className="hidden md:flex flex-row gap-4">
              <HeaderListItem itemName="Top Movies" link="#top" />
              <HeaderListItem itemName="Recommended Movies" link="#recommended" />
              <HeaderListItem itemName="Recently Released" link="#recent" />
              <HeaderListItem itemName="Favourites" link="#fav" />
            </ul>
            <button
              className="text-4xl md:hidden mr-4 text-white"
              onClick={() => setActive(!isActive)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>
        {isActive && (
          <ul className="flex flex-col text-white bg-black py-4 md:hidden gap-4">
            <HeaderListItem itemName="Top Movies" link="#top" />
            <HeaderListItem itemName="Recommended Movies" link="#recommended" />
            <HeaderListItem itemName="Recently Released" link="#recent" />
            <HeaderListItem itemName="Favourites" link="#fav" />
          </ul>
        )}
      </header>
    </div>
  );
}
function Body() {
  const [searchMovie, setSearchMovie] = useState('');
  const [favouriteMovies, setFavouriteMovies] = useState(() => {
    // Retrieve favouriteMovies from localStorage or return an empty array if not present
    const savedMovies = localStorage.getItem('favouriteMovies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  // Update localStorage when favouriteMovies changes
  useEffect(() => {
    localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
  }, [favouriteMovies]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <main className="bg-gradient-to-b from-black to-gray-900 min-h-screen py-10">
      <div className="flex justify-center">
        <form className="  rounded-lg shadow-lg flex gap-4 flex-wrap" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for Movies..."
            className=" flex flex-shrink bg-gray-700 text-white px-6 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
            onChange={(e) => setSearchMovie(e.target.value)}
          />
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Search
          </button>
        </form>
      </div>
      <SearchMovie searchMovie={searchMovie} setSearchMovie={setSearchMovie} favouriteMovies={favouriteMovies} setFavouriteMovies={setFavouriteMovies} />
      <FetchTopMovies favouriteMovies={favouriteMovies} setFavouriteMovies={setFavouriteMovies} />
      <FetchRecommendedMovies favouriteMovies={favouriteMovies} setFavouriteMovies={setFavouriteMovies} />
      <FetchRecentlyReleased favouriteMovies={favouriteMovies} setFavouriteMovies={setFavouriteMovies} />
      <FavouriteMovies favouriteMovies={favouriteMovies} setFavouriteMovies={setFavouriteMovies}/>
    </main>
  );
}


function MovieDetailsModal({ movie, closeModal }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          className="text-white text-right mb-4 cursor-pointer bg-red-600 hover:bg-red-800 py-2 px-4 rounded-lg transition-colors hover:bg-slate-600 delay-150 ease-out duration-100"
          onClick={closeModal}
        >
          Close
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-8/12 h-auto mb-4 rounded"
        />
        <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
        <p className="text-gray-400 mb-4">Release Date: {movie.release_date}</p>
        <p className="text-gray-300 mb-4">{movie.overview}</p>
        <p className="text-gray-400">Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
}

function SearchMovie({ searchMovie, setSearchMovie, favouriteMovies, setFavouriteMovies }) {
  const [searchedMovie, setSearchedMovie] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null); // State for the selected movie

  function saveToFavourite(mov) {
    if (!favouriteMovies.some((movie) => movie.id === mov.id)) {
      setFavouriteMovies([...favouriteMovies, mov]);
      setAddedToFavorites((prevState) => ({
        ...prevState,
        [mov.id]: true,
      }));
      alert("Favourite Movies Updated.");
    } else {
      alert("Movie is already in your favourites.");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const API_KEY = `1d1eaf0c56aa42a80a188a73258317b1`;

    async function fetchMovies() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchMovie}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error('Failed to fetch movies');

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');
        setSearchedMovie(data.results);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    if (searchMovie) fetchMovies();

    return () => controller.abort();
  }, [searchMovie]);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      {isLoading && (
        <div className="flex justify-center text-center bg-slate-700 min-h-screen" id="top">
          <h1 className="text-6xl">Loading...</h1>
        </div>
      )}
      {searchedMovie.length !== 0 && !isLoading && (
        <h1 className="text-2xl text-white text-center py-4 bg-slate-700 my-2 mt-10 rounded-lg" id="top">
          Searched Movie
        </h1>
      )}
      {!isLoading && (
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
            {searchedMovie.map((mov) => (
              <div
                key={mov.id}
                className="bg-gray-800 p-4 rounded shadow-md cursor-pointer"
                onClick={() => setSelectedMovie(mov)} // Open modal on click
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${mov.poster_path}`}
                  alt={mov.title}
                  className="w-8/12 h-auto rounded mb-2"
                />
                <h3 className="text-lg font-semibold text-white">{mov.title}</h3>
                <p className="text-gray-400">Rating: {mov.vote_average}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveToFavourite(mov);
                  }}
                  className={`mt-2 p-1 rounded ${addedToFavorites[mov.id] ? "bg-green-600 hover:bg-green-800" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                >
                  {addedToFavorites[mov.id] ? "Added to Favorite Movies" : "Add to Favorites"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Render the modal if a movie is selected */}
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          closeModal={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
function FetchTopMovies({favouriteMovies,setFavouriteMovies}) {
  const [topMovies, setTopMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState({}); // To track which movies are added


  function saveToFavourite(mov) {
    // Check if the movie is already in the favourites
    if (!favouriteMovies.some((movie) => movie.id === mov.id)) {
      setFavouriteMovies([...favouriteMovies, mov]);
      setAddedToFavorites((prevState) => ({
        ...prevState,
        [mov.id]: true, // Mark the movie as added
      }));
      alert("Favourite Movies Updated.");
    } else {
      alert("Movie is already in your favourites.");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const API_KEY = `1d1eaf0c56aa42a80a188a73258317b1`; // Use environment variable for API key

    async function fetchTopMovies() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error('Failed to fetch top movies');

        const data = await res.json();
        setTopMovies(data.results);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchTopMovies();

    return () => controller.abort();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      {isLoading && (
        <div className="flex justify-center text-center bg-slate-700 min-h-screen" id="top">
          <h1 className="text-6xl">Loading...</h1>
        </div>
      )}
      {!isLoading && (
        <section>
          <h1 className="text-4xl text-white font-bold text-center mb-2 rounded-lg bg-slate-700 py-3" id="top">
            Top Movies
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
            {topMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded shadow-md cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-8/12 h-auto rounded mb-2"
                />
                <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                <p className="text-gray-400">Rating: {movie.vote_average}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveToFavourite(movie);
                  }}
                  className={`mt-2 p-1 rounded ${addedToFavorites[movie.id] ? "bg-green-600 hover:bg-green-800" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                >
                  {addedToFavorites[movie.id] ? "Added to Favorite Movies" : "Add to Favorites"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function FetchRecommendedMovies({favouriteMovies,setFavouriteMovies}) {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState({}); // To track which movies are added

  function saveToFavourite(mov) {
    // Check if the movie is already in the favourites
    if (!favouriteMovies.some((movie) => movie.id === mov.id)) {
      setFavouriteMovies([...favouriteMovies, mov]);
      setAddedToFavorites((prevState) => ({
        ...prevState,
        [mov.id]: true, // Mark the movie as added
      }));
      alert("Favourite Movies Updated.");
    } else {
      alert("Movie is already in your favourites.");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const API_KEY = `1d1eaf0c56aa42a80a188a73258317b1`; // Use environment variable for API key

    async function fetchRecommendedMovies() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error('Failed to fetch recommended movies');

        const data = await res.json();
        setRecommendedMovies(data.results);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendedMovies();

    return () => controller.abort();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      {isLoading && (
        <div className="flex justify-center text-center bg-slate-700 min-h-screen" id="recommended">
          <h1 className="text-6xl">Loading...</h1>
        </div>
      )}
      {!isLoading && (
        <section>
          <h1 className="text-4xl text-white font-bold text-center mb-2 rounded-lg bg-slate-700 py-3" id="recommended">
          {/* <h1 className="text-2xl text-white text-center py-4 bg-slate-700 my-2 mt-10 rounded-lg" id="recommended"> */}
            Recommended Movies
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
            {recommendedMovies.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded shadow-md cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-8/12 h-auto rounded mb-2"
                />
                <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                <p className="text-gray-400">Rating: {movie.vote_average}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveToFavourite(movie);
                  }}
                  className={`mt-2 p-1 rounded ${addedToFavorites[movie.id] ? "bg-green-600 hover:bg-green-800" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                >
                  {addedToFavorites[movie.id] ? "Added to Favorite Movies" : "Add to Favorites"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function FetchRecentlyReleased({favouriteMovies,setFavouriteMovies}) {
  const [recentlyReleased, setRecentlyReleased] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState({}); // To track which movies are added


  function saveToFavourite(mov) {
    // Check if the movie is already in the favourites
    if (!favouriteMovies.some((movie) => movie.id === mov.id)) {
      setFavouriteMovies([...favouriteMovies, mov]);
      setAddedToFavorites((prevState) => ({
        ...prevState,
        [mov.id]: true, // Mark the movie as added
      }));
      alert("Favourite Movies Updated.");
    } else {
      alert("Movie is already in your favourites.");
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    const API_KEY = `1d1eaf0c56aa42a80a188a73258317b1`; // Use environment variable for API key

    async function fetchRecentlyReleased() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error('Failed to fetch recently released movies');

        const data = await res.json();
        setRecentlyReleased(data.results);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRecentlyReleased();

    return () => controller.abort();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      {isLoading && (
        <div className="flex justify-center text-center bg-slate-700 min-h-screen" id="recent">
          <h1 className="text-6xl">Loading...</h1>
        </div>
      )}
      {!isLoading && (
        <section>
          <h1 className="text-4xl text-white font-bold text-center mb-2 rounded-lg bg-slate-700 py-3" id="recent">
            Recently Released
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4">
            {recentlyReleased.map((movie) => (
              <div key={movie.id} className="bg-gray-800 p-4 rounded shadow-md cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-8/12 h-auto rounded mb-2"
                />
                <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                <p className="text-gray-400">Rating: {movie.vote_average}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveToFavourite(movie);
                  }}
                  className={`mt-2 p-1 rounded ${addedToFavorites[movie.id] ? "bg-green-600 hover:bg-green-800" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                >
                  {addedToFavorites[movie.id] ? "Added to Favorite Movies" : "Add to Favorites"}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function App() {
  return (
    <div className="App bg-gray-900 text-white min-h-screen">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}



    function Footer() {
      return (
        <footer className="footer bg-gray-950 text-white py-6">
          <div className="footer-content max-w-screen-xl mx-auto px-4">
            
            {/* Footer Text */}
            <div className="text-center mb-4">
              <p className="footer-text text-sm">&copy; 2024 Movie Mingle. All rights reserved.</p>
            </div>
    
            {/* Footer Links */}
            <div className="footer-links flex justify-center space-x-8 mb-4">
              <a href="#about" className="footer-link text-sm hover:text-gray-400">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                About Us
              </a>
              <a href="#services" className="footer-link text-sm hover:text-gray-400">
                <FontAwesomeIcon icon={faWrench} className="mr-2" />
                Services
              </a>
              <a href="#contact" className="footer-link text-sm hover:text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Contact
              </a>
            </div>
    
            {/* Social Links */}
            <div className="footer-social flex justify-center space-x-6">
              <a href="https://www.linkedin.com" className="social-link hover:text-blue-300" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
              </a>
              <a href="https://www.github.com" className="social-link hover:text-gray-500" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} className="text-xl" />
              </a>
              <a href="https://www.facebook.com" className="social-link hover:text-blue-400" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} className="text-xl" />
              </a>
            </div>
            
          </div>
        </footer>
      );
    }
export default App;
