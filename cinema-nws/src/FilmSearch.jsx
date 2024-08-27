import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function filmSearch() {
    const API_KEY = '18ffbdd4f338668948dfeecc71baa949';
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            if (searchTerm.trim() === '') return;

            try {
                const searchQuery = `&query=${encodeURIComponent(searchTerm)}`;
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&page=${currentPage}&include_adult=false${searchQuery}`
                );

                setMovies(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error('Erreur lors de la récupération des films', error);
            }
        };

        fetchMovies();
    }, [currentPage, searchTerm]);

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => {
            const newPage = prev + direction;
            return newPage > 0 && newPage <= totalPages ? newPage : prev;
        });
    };

    return (
        <div>
            <h1>Rechercher un film</h1>
            <Link to="/">Retour</Link>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <div className="results">
                {movies.length === 0 ? (
                    <p>Aucun résultat trouvé.</p>
                ) : (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <Link to={`/film/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    className="movie-poster"
                                />
                                <div className="movie-info">
                                    <h3>{movie.title}</h3>
                                    <p><strong>Date de sortie:</strong> {movie.release_date}</p>
                                    <p>{movie.overview}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
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
            )}
        </div>
    );
}
