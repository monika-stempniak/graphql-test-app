import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query {
    getAllMovies {
      id
      movieTitle
      movieGenres
      watched
      favorite
    }
  }
`;

export const GET_MOVIE_DETAILS = gql`
  query getMovieDetails($id: ID!) {
    getMovieDetails(id: $id) {
      movieGenres
      movieDirector
      movieDescription
    }
  }
`;

export const GET_MOVIES_BY_GENRE = gql`
  query getMoviesByGenre($movieId: ID!) {
    getMoviesByGenre(movieId: $movieId) {
      genre
      movies
    }
  }
`;
