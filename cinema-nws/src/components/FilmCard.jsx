import React from 'react';
import { Link } from 'react-router-dom';

const FilmCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/film/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.title}</p>
      </Link>
    </div>
  );
};

export default FilmCard;