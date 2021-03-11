const qraphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLID, GraphQLList } = qraphql;

const { MovieType } = require('./typeDefs');
const movieData = require('../MOCK_DATA.json');

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
  fields: {
    getAllMovies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movieData;
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
