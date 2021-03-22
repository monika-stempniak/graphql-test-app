const qraphql = require('graphql');
const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLID, GraphQLList } = qraphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    movieTitle: { type: GraphQLString },
    movieGenres: { type: GraphQLString },
    watched: { type: GraphQLBoolean },
    favorite: { type: GraphQLBoolean },
    movieDirector: { type: GraphQLString },
    movieDescription: { type: GraphQLString },
  })
})

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    genre: { type: GraphQLString },
    movies: { type: new GraphQLList(GraphQLString) },
  })
})

module.exports = {
  MovieType,
  GenreType
};
