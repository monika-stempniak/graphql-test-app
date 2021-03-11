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
