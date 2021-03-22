import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import MovieCard from './MovieCard';
import { GET_MOVIES } from '../GraphQL/Queries';

function Movies() {
  const { error, loading, data } = useQuery(GET_MOVIES);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data) {
      setMovies(data.getAllMovies);
    }
  }, [data]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <ul className="px-0 mt-1">
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </ul>
  );
}

export default Movies;
