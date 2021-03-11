import { gql } from '@apollo/client';

export const ADD_MOVIE = gql`
  mutation addMovie(
    $movieTitle: String!
    $movieGenres: String!
    $watched: Boolean
    $favorite: Boolean
  ) {
    addMovie(
      movieTitle: $movieTitle
      movieGenres: $movieGenres
      watched: $watched
      favorite: $favorite
    ) {
      movieTitle
    }
  }
`;
