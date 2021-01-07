//const { ApolloServer, gql } = require('apollo-server');

const { PrismaClient } = require("@prisma/client");
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Lesson = require('./resolvers/Lesson');
const graphQLSchema = require('./schema.graphql.js');
const NodeCache = require( "node-cache" );
const scheduleNotification = require('./cronjobs/scheduleNotification');
const sendNotification = require('./cronjobs/sendNotification');
const { ApolloServer } =require('apollo-server-express');
const express = require('express');
var cors = require('cors')

var PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());

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


const server = new ApolloServer({
  typeDefs: graphQLSchema,
  resolvers,
  context: request => ({
    ...request,
    prisma,
    myCache
  })
});

server.applyMiddleware({app});


app.listen(PORT,() =>
console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));


// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });



