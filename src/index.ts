import { ApolloServer } from '@apollo/server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { readFileSync } from 'fs';
import  path = require('path');
import express = require( "express" );
import * as cors from 'cors';
import { startStandaloneServer } from '@apollo/server/standalone';
// const app = express();
// const port = 8080; // default port to listen



async function createServer() {  
const supergraphSdl = readFileSync('./supergraph.graphql').toString();

  // Initialize an ApolloGateway instance and pass it
  // the supergraph schema as a string


  const gateway = new ApolloGateway({
          supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
               //  { name: "fixture", url: "https://sca.paddypower.com/graphql" }
                  { name: "events", url: "http://localhost:8080/graphql" },
                  { name: "markets", url: "http://localhost:8080/graphql" },
                  { name: "outcomes", url: "http://localhost:8080/graphql" },
                  { name: "marketTeamMapping", url: "http://localhost:8081/graphql" },               
                  { name: "teams", url: "http://localhost:8083/graphql" }, 
                        ]
          })
      });

  // Pass the ApolloGateway to the ApolloServer constructor
  const server = new ApolloServer({
    gateway,
  });

// Note the top-level `await`!
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at ${url}`);


}


createServer();