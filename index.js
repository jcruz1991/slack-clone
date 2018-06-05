import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';

const SECRET = 'sgisjgrriwejgif';
const SECRET2 = 'sgisjgrriwejgif234324njfn';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

//allow cross-origin requests
app.use(cors());

const graphqlEndpoint = '/graphql';

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema, context: {
    models,
    SECRET,
    SECRET2
} }));
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync().then(() => {
    app.listen(8080);
});