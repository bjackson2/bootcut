import {ApolloClient, InMemoryCache, HttpLink, split} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: `http://${process.env.REACT_APP_GRAPHQL_SERVER_URI}`,
});
const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_GRAPHQL_SERVER_URI}`,
  options: {reconnect: true},
});

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
