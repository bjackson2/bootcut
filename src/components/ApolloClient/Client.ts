import {ApolloClient} from '@apollo/client';
import link from './Link';
import cache from './Cache';

const client = new ApolloClient({
  cache,
  link,
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
