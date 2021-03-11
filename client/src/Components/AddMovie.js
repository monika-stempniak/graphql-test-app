import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_MOVIE } from '../GraphQL/Mutations';
import { GET_MOVIES } from '../GraphQL/Queries';

const MOVIE_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Children',
  'Comedy',
  'Western',
  'Horror',
  'Thriller',
  'Drama',
  'Romance',
  'War',
  'Crime',
  'Mystery',
  'Sci-Fi',
  'Fantasy',
];

function AddMovie() {
  const [addMovie, { error, loading }] = useMutation(ADD_MOVIE);
  const [movieTitle, setMovieTitle] = useState('');
  const [movieGenres, setMovieGenres] = useState('');
  const [multiSelectValue, setMultiSelectValue] = useState([]);

  const handleMultiSelect = (e) => {
    const selectedGenre = e.target.value;
    const multiSelectArray = [...multiSelectValue, selectedGenre];
    setMultiSelectValue(multiSelectArray);
    const movieGenresAsString = movieGenres ? `${movieGenres}|${selectedGenre}` : selectedGenre;
    setMovieGenres(movieGenresAsString);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({
      variables: {
        movieTitle,
        movieGenres,
        watched: false,
        favorite: false,
      },
      refetchQueries: [{ query: GET_MOVIES }],
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div className="card mb-2 w-100" style={{ maxWidth: 400 }}>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Movie Title"
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <select
            className="form-select my-2"
            multiple
            size={4}
            value={multiSelectValue}
            onChange={handleMultiSelect}
          >
            {MOVIE_GENRES.sort().map((genre) => {
              return (
                <option value={genre} key={genre}>
                  {genre}
                </option>
              );
            })}
          </select>
          <button className="btn btn-primary w-100 movie-btn">Add Movie</button>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
