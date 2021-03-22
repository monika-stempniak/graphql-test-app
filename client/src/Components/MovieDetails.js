import React from 'react';

function MovieDetails({
  movieGenres = '',
  movieDirector = '',
  movieDescription = '',
  moviesByGenre = [],
}) {
  return (
    <div className="mt-3 details-container">
      <div className="mt-3 details-text">
        <p className="mb-1">
          <b>Director:</b> <i>{movieDirector || '-'}</i>
        </p>
        <p>
          <b>Description:</b> <i>{movieDescription || '-'}</i>
        </p>
        {movieGenres && (
          <>
            <p className="mb-2">{`List of other ${movieGenres} movies:`}</p>
            {moviesByGenre.map(({ genre, movies }) => (
              <p key={genre} className="mb-1">
                <b>{genre}: </b>
                {movies.map((movie) => (
                  <i key={movie}>{movie}, </i>
                ))}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
