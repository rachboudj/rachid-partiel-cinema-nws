import React from 'react';

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

const FilmSearchCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
            />
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p><strong>Date de sortie:</strong> {movie.release_date}</p>
                <p>{truncateText(movie.overview, 120)}</p>
            </div>
        </div>
    );
}

export default FilmSearchCard;
