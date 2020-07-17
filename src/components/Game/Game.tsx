import React, {useEffect} from 'react';
import {useQuery, gql} from '@apollo/client';
import BoardRows from '../BoardRows';
import {useParams} from 'react-router-dom';
import {BOARD_ROW_FRAGMENT} from '../BoardRows/BoardRow';

const GAME_QUERY = gql`
  query GameQuery($id: String!) {
    game(id: $id) {
      id
      name
      boardRows {
        ...BoardRowFragment
      }
    }
  }
  ${BOARD_ROW_FRAGMENT}
`;

const BOARD_ROW_UPDATED_SUBSCRIPTION = gql`
  subscription BoardRowUpdated($gameId: String!) {
    boardRowUpdated(gameId: $gameId) {
      ...BoardRowFragment
    }
  }
  ${BOARD_ROW_FRAGMENT}
`;

const boardRowUpdatedSubscription = (
  subscribeToMore: any,
  gameId: string
) => () => {
  subscribeToMore({
    document: BOARD_ROW_UPDATED_SUBSCRIPTION,
    variables: {gameId},
  });
};

const Game: React.FC = () => {
  const {id} = useParams();
  const {loading, error, data, subscribeToMore} = useQuery(GAME_QUERY, {
    variables: {id},
  });

  useEffect(boardRowUpdatedSubscription(subscribeToMore, id), []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div>
      <h1>Game time!</h1>
      <h3>Name: {data.game.name}</h3>
      <BoardRows boardRows={data.game.boardRows} />
    </div>
  );
};

export default Game;
