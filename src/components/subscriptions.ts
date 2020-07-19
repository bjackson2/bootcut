import {gql} from '@apollo/client';
import {BOARD_ROW_FRAGMENT} from './BoardRows';
import {GAME_PARTICIPANT_FRAGMENT} from './GameParticipants';
import {GameParticipant} from '../types';

const BOARD_ROW_UPDATED_SUBSCRIPTION = gql`
  subscription BoardRowUpdated($gameCode: String!) {
    boardRowUpdated(gameCode: $gameCode) {
      ...BoardRowFragment
    }
  }
  ${BOARD_ROW_FRAGMENT}
`;

const GAME_PARTICIPANT_CREATED_SUBSCRIPTION = gql`
  subscription GameParticipantCreated($gameCode: String!) {
    gameParticipantCreated(gameCode: $gameCode) {
      ...gameParticipantFragment
    }
  }
  ${GAME_PARTICIPANT_FRAGMENT}
`;

interface AddSubscriptionsArgs {
  subscribeToMore: any;
  variables: {
    gameCode: string;
  };
}

interface GameParticipantCreatedSubscriptionData {
  subscriptionData: {
    data: {
      gameParticipantCreated: GameParticipant;
    };
  };
}

const addSubscriptions = ({
  subscribeToMore,
  variables: {gameCode},
}: AddSubscriptionsArgs): void => {
  subscribeToMore({
    document: BOARD_ROW_UPDATED_SUBSCRIPTION,
    variables: {gameCode},
  });
  subscribeToMore({
    document: GAME_PARTICIPANT_CREATED_SUBSCRIPTION,
    variables: {gameCode},
    updateQuery: (
      prev: Record<string, any>,
      {subscriptionData}: GameParticipantCreatedSubscriptionData
    ) => {
      if (!subscriptionData) return prev;

      const game = {
        ...prev.game,
        gameParticipants: [
          ...prev.game.gameParticipants,
          subscriptionData.data.gameParticipantCreated,
        ],
      };

      return {...prev, game};
    },
  });
};

export default addSubscriptions;
