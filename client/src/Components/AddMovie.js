import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_MOVIE } from '../GraphQL/Mutations';

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
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie Title"
        onChange={(e) => setMovieTitle(e.target.value)}
      />
      <br />
      <select multiple size={6} value={multiSelectValue} onChange={handleMultiSelect}>
        {MOVIE_GENRES.sort().map((genre) => {
          return (
            <option value={genre} key={genre}>
              {genre}
            </option>
          );
        })}
      </select>
      <br />
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
