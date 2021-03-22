const qraphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLID, GraphQLList } = qraphql;

const { MovieType, GenreType } = require('./typeDefs');
const movieData = require('../MOCK_DATA.json');

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
  fields: {
    getAllMovies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movieData;
      }
    },
    getMovieDetails: {
      type: MovieType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return movieData.find(movie => movie.id === Number(args.id)) || {};
      }
    },
    getMoviesByGenre: {
      type: new GraphQLList(GenreType),
      args: {
        movieId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const selectedMovie = movieData.find(movie => movie.id === Number(args.movieId)) || {};
        const selectedMovieGenres = selectedMovie.movieGenres.split('|');
        const obj = {};
        selectedMovieGenres.forEach(genre => {
          for (const movie of movieData) {
            if(movie.movieGenres.includes(genre)) {
              if(obj[genre]) {
                obj[genre].push(movie.movieTitle);
              } else {
                obj[genre] = [movie.movieTitle];
              }
            }
          }
        });

        const moviesByGenre = Object.keys(obj).map(genre => ({
          genre,
          movies: obj[genre]
        }));

        return moviesByGenre;
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        movieTitle: { type: GraphQLString },
        movieGenres: { type: GraphQLString },
        watched: { type: GraphQLBoolean },
        favorite: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        movieData.unshift({
          id: movieData.length + 1,
          ...args
        });
        return args;
      }
    },
    toggleFavorite: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        movieData.map(movie => {
          if(movie.id === Number(args.id)) {
            movie.favorite = !movie.favorite;
          }
          return movie;
        })
        return args;
      }
    },
    toggleWatched: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        movieData.map(movie => {
          if(movie.id === Number(args.id)) {
            movie.watched = !movie.watched;
          }
          return movie;
        })
        return args;
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = schema;
