"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: '../config/schema.graphql'
});
server.start(() => console.log("tudo numa nice"));
