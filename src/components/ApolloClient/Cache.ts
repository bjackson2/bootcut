import {InMemoryCache} from '@apollo/client';
import {currentGameParticipantsVar} from '../../utilities/currentGameParticipants';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        currentGameParticipants: {
          read() {
            return currentGameParticipantsVar();
          },
        },
      },
    },
  },
});

export default cache;
