import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './components/Pagination';
import FilmCard from './components/FilmCard';
import GenreSelector from './components/GenreSelector';

export default function Home() {
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

    useEffect(() => {
        const fetchMovies = async () => {
            try {

                const genreQuery = selectedGenre ? `&with_genres=${selectedGenre}` : '';
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=fr&page=${currentPage}&sort_by=popularity.desc${genreQuery}`
                );

                setMovies(response.data.results.slice(0, 10));
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error(`Erreur lors de la récupération des films`, error);
            }
        };

        fetchMovies();
    }, [currentPage, selectedGenre]);

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => {
            const newPage = prev + direction;
            return newPage > 0 && newPage <= totalPages ? newPage : prev;
        });
    };

    return (
        <>
            <>
                <Link to="/recherche">Rechercher</Link>

                <div className="genre-select">
                    <GenreSelector
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        genres={genres}
                    />
                </div>

                <div className='flex flex-wrap'>
                    {movies.map((movie) => (
                        <FilmCard key={movie.id} movie={movie} />
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
            </>
        </>
    )
}
