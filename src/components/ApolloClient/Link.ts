import {HttpLink, split} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: `http://${process.env.REACT_APP_GRAPHQL_SERVER_URI}`,
});
const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_GRAPHQL_SERVER_URI}`,
  options: {reconnect: true},
});

export default split(
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
