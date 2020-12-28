const { ApolloServer, gql } = require('apollo-server');

const { PrismaClient } = require("@prisma/client");
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Lesson = require('./resolvers/Lesson');
const graphQLSchema = require('./schema.graphql.js');
const NodeCache = require( "node-cache" );
const scheduleNotification = require('./cronjobs/scheduleNotification');
const sendNotification = require('./cronjobs/sendNotification');

const myCache = new NodeCache();

const prisma = new PrismaClient();
scheduleNotification(prisma,myCache);
sendNotification(prisma);

const test = () => {


  prisma.watchSymbols.delete({
    where: {
      symbol: symbol
    }

  })
}

const resolvers = {
  Query,
  Mutation,
  User,
  Lesson
};

// const server = new GraphQLServer({
//   typeDefs: "./schema.graphql",
//   resolvers,
//   context: request => ({
//     ...request,
//     prisma,
//   }),
// });

const server = new ApolloServer({
  typeDefs: graphQLSchema,
  resolvers,
  context: request => ({
    ...request,
    prisma,
    myCache
  })
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


// server.start(() => console.log("Server is running on http://localhost:4000"));
