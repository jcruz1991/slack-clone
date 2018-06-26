import ApolloClient from "apollo-client";
import { createHttpLink  } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from "apollo-link";
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
});

// Middleware
const middlewareLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        'x-token': localStorage.getItem('token') || null,
        'x-refresh-token': localStorage.getItem('refreshToken') || null,
      } 
    });

    return forward(operation);
});

// Aterware
const afterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {

        // passes back object with headers in it
        const context = operation.getContext();
        // Get headers
        const { response: { headers } } = context;
        
        // Set tokens if headers exists
        if(headers) {
            const token = headers.get('token');
            const refreshToken = headers.get('x-refresh-token');
            
            if(token) {
                localStorage.setItem('token', token);
            }
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

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/subscriptions`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLinkWithMiddleware,
);

export default new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});