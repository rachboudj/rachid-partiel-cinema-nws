import React from 'react';

const FilmDetailsCard = ({ movie }) => {
    return (
        <div>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <div>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <p><strong>Date de sortie :</strong> {movie.release_date}</p>
                <p><strong>Note :</strong> {movie.vote_average}/10</p>
                <p><strong>Genres :</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
        </div>
    );
}

export default FilmDetailsCard;