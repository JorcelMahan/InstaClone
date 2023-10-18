import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "./gql/schema.js";
import resolvers from "./gql/resolver.js";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";

connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers
});


const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`Server ready at ${url}`);