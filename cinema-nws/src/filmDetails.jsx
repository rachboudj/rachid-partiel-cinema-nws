import { useParams } from 'react-router-dom';
import {React, useState, useEffect } from 'react';
import axios from 'axios';

export default function filmDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const API_KEY = '18ffbdd4f338668948dfeecc71baa949';

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr`
                );
                setMovie(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du film:', error);
            }
        };

        fetchMovieDetail();
    }, [id]);

    console.log(movie)

    if (!movie) return <div>Chargement...</div>;

    return (
        <div>
            <h1>{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <p>{movie.overview}</p>
            <p>Date de sortie : {movie.release_date}</p>
            <p>Note : {movie.vote_average}</p>
            <p>Genres : {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
    )
}
