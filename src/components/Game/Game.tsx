import React, {useEffect} from 'react';
import {useQuery, gql} from '@apollo/client';
import BoardRows from '../BoardRows';
import {useParams} from 'react-router-dom';
import {BOARD_ROW_FRAGMENT} from '../BoardRows/BoardRow';

const GAME_QUERY = gql`
  query GameQuery($code: String!) {
    game(code: $code) {
      id
      code
      boardRows {
        ...BoardRowFragment
      }
    }
  }
  ${BOARD_ROW_FRAGMENT}
`;

const BOARD_ROW_UPDATED_SUBSCRIPTION = gql`
  subscription BoardRowUpdated($gameCode: String!) {
    boardRowUpdated(gameCode: $gameCode) {
      ...BoardRowFragment
    }
  }
  ${BOARD_ROW_FRAGMENT}
`;

const Game: React.FC = () => {
  const {gameCode} = useParams();
  const {loading, error, data, subscribeToMore} = useQuery(GAME_QUERY, {
    variables: {code: gameCode},
  });

  useEffect(() => {
    subscribeToMore({
      document: BOARD_ROW_UPDATED_SUBSCRIPTION,
      variables: {gameCode},
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div>
      <h1>Game time!</h1>
      <h3>Game Code: {data.game.code}</h3>
      <BoardRows boardRows={data.game.boardRows} />
    </div>
  );
};

export default Game;
