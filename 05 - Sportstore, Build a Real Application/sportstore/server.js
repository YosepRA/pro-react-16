const express = require('express');
const jsonServer = require('json-server');
const chokidar = require('chokidar');
const cors = require('cors');
const fs = require('fs');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
const queryResolver = require('./serverQueriesResolver');
const mutationResolver = require('./serverMutationsResolver');

const fileName = process.argv[2] || './data.js';
const port = process.argv[3] || 3500;

let router, graph;
const app = express();

const createServer = () => {
  delete require.cache[require.resolve(fileName)];
  setTimeout(() => {
    router = jsonServer.router(
      fileName.endsWith('.js') ? require(fileName)() : fileName
    );

    // GraphQL setup.
    let schema =
      fs.readFileSync('./serverQueriesSchema.graphql', 'utf-8') +
      fs.readFileSync('./serverMutationsSchema.graphql', 'utf-8');
    let resolvers = { ...queryResolver, ...mutationResolver };
    graph = graphqlHTTP({
      schema: buildSchema(schema),
      rootValue: resolvers,
      graphiql: true,
      context: { db: router.db },
    });
  }, 100);
};

createServer();

app.use(cors());
app.use(jsonServer.bodyParser);
app.use('/api', (req, res, next) => router(req, res, next));
app.use('/graphql', (req, res, next) => graph(req, res, next));

chokidar.watch(fileName).on('change', () => {
  console.log('Reloading web service data...');
  createServer();
  console.log('Reloading web service data completed.');
});

app.listen(port, () => console.log('Web service running on port ' + port));
