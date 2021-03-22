import React, { useState } from 'react';
import cn from 'classnames';
import { useMutation, useLazyQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { TOGGLE_FAVORITE, TOGGLE_WATCHED } from '../GraphQL/Mutations';
import { GET_MOVIES, GET_MOVIE_DETAILS, GET_MOVIES_BY_GENRE } from '../GraphQL/Queries';
import MovieDetails from './MovieDetails';

function MovieCard({ id, movieTitle, movieGenres, watched, favorite }) {
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);
  const [toggleWatched] = useMutation(TOGGLE_WATCHED);
  const [getMovieDetails, { data: movieDetails }] = useLazyQuery(GET_MOVIE_DETAILS);
  const [getMoviesByGenre, { data: moviesByGenre }] = useLazyQuery(GET_MOVIES_BY_GENRE);
  const [opened, setOpened] = useState(false);

  const handleClickFavorite = () => {
    toggleFavorite({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_MOVIES }],
    });
  };

  const handleClickWatched = () => {
    toggleWatched({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_MOVIES }],
    });
  };

  const toggleDetails = () => {
    setOpened(!opened);
    getMovieDetails({ variables: { id } });
    getMoviesByGenre({ variables: { movieId: id } });
  };

  return (
    <div className="card">
      <div className="card-body row">
        <div className="col-9">
          <h6 className="card-title mb-0 title movie-title" onClick={toggleDetails}>
            {movieTitle}
          </h6>
          <small className="card-text">{movieGenres}</small>
          {opened && movieDetails && moviesByGenre && (
            <MovieDetails
              {...movieDetails.getMovieDetails}
              moviesByGenre={moviesByGenre.getMoviesByGenre}
            />
          )}
        </div>
        <div className="col-3 d-flex justify-content-end">
          <FontAwesomeIcon
            icon={faEye}
            className={cn('me-2', 'icon-default', { 'icon-watched': watched })}
            onClick={handleClickWatched}
          />
          <FontAwesomeIcon
            icon={faHeart}
            className={cn('icon-default', { 'icon-favorite': favorite })}
            onClick={handleClickFavorite}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
