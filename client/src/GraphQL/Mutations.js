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

export const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
    }
  }
`;

export const TOGGLE_WATCHED = gql`
  mutation toggleWatched($id: ID!) {
    toggleWatched(id: $id) {
      id
    }
  }
`;
