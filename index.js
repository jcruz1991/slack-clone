import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import models from './models';
import { refreshTokens } from './auth';

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

const addUser = async (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        try {
            const { user } = jwt.verify(token, SECRET);
            req.user = user;
        } catch (err) {
            const refreshToken = req.headers.refreshAuthorization;
            const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
            if (newTokens.token && newTokens.refreshToken) {
                res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTokens.refreshToken);
            }
            req.user = newTokens.user;
        }
    }
    next();
};

app.use(addUser);

const graphqlEndpoint = '/graphql';

app.use(
    graphqlEndpoint, 
    bodyParser.json(), 
    graphqlExpress((req) => ({ 
        schema, 
        context: {
            models,
            user: req.user,
            SECRET,
            SECRET2
        } 
    }))
);
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync().then(() => {
    app.listen(8080);
});