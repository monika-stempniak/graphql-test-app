import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { GET_MOVIES } from '../GraphQL/Queries';

function Movies() {
  const { error, loading, data } = useQuery(GET_MOVIES);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data) {
      setMovies(data.getAllMovies);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <ul className="px-0 mt-1">
      {movies.map((movie) => {
        return (
          <div className="card" key={movie.id}>
            <div className="card-body row">
              <div className="col-9">
                <h6 className="card-title mb-0 movie-title">{movie.movieTitle}</h6>
                <small className="card-text">{movie.movieGenres}</small>
              </div>
              <div className="col-3 d-flex justify-content-end">
                <FontAwesomeIcon
                  icon={faEye}
                  className={`${movie.watched ? 'icon-eye' : 'icon-default'} me-2`}
                />
                <FontAwesomeIcon
                  icon={faHeart}
                  className={movie.favorite ? 'icon-heart' : 'icon-default'}
                />
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
}

export default Movies;
