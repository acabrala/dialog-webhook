import { GraphQLServer } from 'graphql-yoga'

const server = new GraphQLServer({
    typeDefs: '../config/schema.graphql'
})
server.start(() => console.log("tudo numa nice"))
   
