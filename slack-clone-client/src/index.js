import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import Routes from './routes';

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from "apollo-link";

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
});

const middlewareLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token') || null,
        refreshAuthorization: localStorage.getItem('refreshToken') || null,
      } 
    });

    return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        const context = operation.getContext();
        const { response: { headers } } = context;
        
        if(headers) {
            const refreshToken = headers.get('x-refresh-token');
        if(refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    }
        return response;
    });
});

const httpLinkWithMiddleware = afterwareLink.concat(
    middlewareLink.concat(httpLink)
);

const client = new ApolloClient({
    link: httpLinkWithMiddleware,
    cache: new InMemoryCache()
});


const App = (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
