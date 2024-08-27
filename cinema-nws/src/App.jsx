import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  const API_KEY = '18ffbdd4f338668948dfeecc71baa949';

  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Aventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comédie' },
    { id: 80, name: 'Crime' },
  ];

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('discover');

  console.log(searchTerm)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url;

        if (searchMode === 'search') {
          const searchQuery = searchTerm ? `&query=${encodeURIComponent(searchTerm)}` : '';
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&page=${currentPage}${searchQuery}&include_adult=false`;
        } else {
          const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=fr&page=${currentPage}&sort_by=popularity.desc${genreQuery}`;
        }

        const response = await axios.get(url);

        setMovies(response.data.results.slice(0, 10));
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error(`Erreur lors de la récupération des films`, error);
      }
    };

    fetchMovies();
  }, [currentPage, selectedGenre, searchTerm, searchMode]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      const newPage = prev + direction;
      return newPage > 0 && newPage <= totalPages ? newPage : prev;
    });
  };

  return (
    <>
      <>
        <div className="search-mode">
        {searchMode === 'discover' && (
          <button
            onClick={() => {
              setSearchMode('search');
              setCurrentPage(1);
            }}
            disabled={searchMode === 'search'}
          >
            Recherche
          </button>
          )}
        </div>

        {searchMode === 'search' && (
          <div>
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />

            <button
              onClick={() => {
                setSearchMode('discover');
                setCurrentPage(1);
                setSearchTerm('');
              }}
              disabled={searchMode === 'discover'}
            >
              Découverte
            </button>
          </div>
        )}

        {searchMode === 'discover' && (

          <div className="genre-select">
            <label htmlFor="genre">Choisir un genre:</label>
            <select
              id="genre"
              value={selectedGenre || ''}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Tous les genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className='flex flex-wrap'>
          {movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>

        <div>
          <button
            onClick={() => handlePageChange(-1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <span>Page {currentPage} sur {totalPages}</span>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </>
    </>
  )
}

export default App
