const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Lesson = require('./resolvers/Lesson');

const { getUserId } = require("./utils.js");

const prisma = new PrismaClient();

const test = ()=>{
 prisma.watchSymbols.delete({
   where : {
     symbol : symbol
   }
   
 })
}

const resolvers = {
  Query,
  Mutation,
  User,
  Lesson
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
});

server.start(() => console.log("Server is running on http://localhost:4000"));
