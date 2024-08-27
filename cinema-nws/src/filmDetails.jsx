import { useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function filmDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [actors, setActors] = useState([]);
    const API_KEY = '18ffbdd4f338668948dfeecc71baa949';

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const [movieResponse, reviewsResponse, actorsResponse] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr`),
                    axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=fr&page=1`),
                    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=fr`)
                ]);
                setMovie(movieResponse.data);
                setReviews(reviewsResponse.data.results);
                setActors(actorsResponse.data.cast);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du film:', error);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (!movie) return <div>Chargement...</div>;

    return (
        <div>
            <h1>{movie.title}</h1>
            <Link to={`/`}>Retour</Link>

            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <p>{movie.overview}</p>
            <p>Date de sortie : {movie.release_date}</p>
            <p>Note : {movie.vote_average}</p>
            <p>Genres : {movie.genres.map(genre => genre.name).join(', ')}</p>

            <div>
                <h2>Acteurs</h2>
                {actors.length === 0 ? (
                    <p>Aucun acteur disponible pour ce film.</p>
                ) : (
                    <div className="actors-list">
                        {actors.slice(0, 10).map((actor) => (
                            <div key={actor.id} className="actor">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                    alt={actor.name}
                                    className="actor-img"
                                />
                                <p>{actor.name}</p>
                                <p>Rôle : {actor.character}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h2>Avis</h2>
                {reviews.length === 0 ? (
                    <p>Aucun avis disponible pour ce film.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id}>
                            <h3>{review.author}</h3>
                            <p>{review.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>


    )
}
