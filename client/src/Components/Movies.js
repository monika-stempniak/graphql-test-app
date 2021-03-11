import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

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
    <ul>
      {movies.map((movie) => {
        return <h3 key={movie.id}>{movie.movieTitle}</h3>;
      })}
    </ul>
  );
}

export default Movies;
