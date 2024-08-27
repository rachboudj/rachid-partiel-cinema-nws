import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

const API_KEY = '18ffbdd4f338668948dfeecc71baa949';
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-US&page=1`;

function App() {
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Aventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comédie' },
    { id: 80, name: 'Crime' },
  ];

  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      const movies = {};
      for (let genre of genres) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&language=en-US&page=1`
          );
          movies[genre.name] = response.data.results;
        } catch (error) {
          console.error(`Erreur lors de la récupération des films pour le genre ${genre.name}:`, error);
        }
      }
      setMoviesByGenre(movies);
    };

    fetchMoviesByGenre();
  }, []);

  return (
    <>
    <h1 className='text-3xl font-bold underline'>jdskjdfjf</h1>
      {Object.keys(moviesByGenre).length === 0 ? (
        <p>Chargement...</p>
      ) : (
        genres.map((genre) => (
          <div key={genre.id}>
            <h2 className='bg-red-900'>{genre.name}</h2>
            <div className='flex bg-red-500'>
              {moviesByGenre[genre.name]?.map((movie) => (
                <div key={movie.id} style={{ margin: '10px' }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    style={{ borderRadius: '8px' }}
                  />
                  <p>{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  )
}

export default App
