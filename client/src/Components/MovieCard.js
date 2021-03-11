import React from 'react';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { TOGGLE_FAVORITE, TOGGLE_WATCHED } from '../GraphQL/Mutations';
import { GET_MOVIES } from '../GraphQL/Queries';

function MovieCard({ id, movieTitle, movieGenres, watched, favorite }) {
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);
  const [toggleWatched] = useMutation(TOGGLE_WATCHED);

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

  return (
    <div className="card">
      <div className="card-body row">
        <div className="col-9">
          <h6 className="card-title mb-0 movie-title">{movieTitle}</h6>
          <small className="card-text">{movieGenres}</small>
        </div>
        <div className="col-3 d-flex justify-content-end">
          <FontAwesomeIcon
            icon={faEye}
            className={`${watched ? 'icon-watched' : 'icon-default'} me-2`}
            onClick={handleClickWatched}
          />
          <FontAwesomeIcon
            icon={faHeart}
            className={favorite ? 'icon-favorite' : 'icon-default'}
            onClick={handleClickFavorite}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
