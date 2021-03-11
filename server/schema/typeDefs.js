const qraphql = require('graphql');
const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLID } = qraphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    movieTitle: { type: GraphQLString },
    movieGenres: { type: GraphQLString },
    watched: { type: GraphQLBoolean },
    favorite: { type: GraphQLBoolean },
  })
})

module.exports = {
  MovieType
};
