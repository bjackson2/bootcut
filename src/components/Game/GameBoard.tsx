import React, {useEffect} from 'react';
import {useQuery, gql} from '@apollo/client';
import {useParams} from 'react-router-dom';
import BoardRows, {BOARD_ROW_FRAGMENT} from '../BoardRows';
import GameParticipants, {GAME_PARTICIPANT_FRAGMENT} from '../GameParticipants';
import GameDuration from '../GameDuration';
import addSubscriptions from '../subscriptions';
import {TURN_ORDER_FRAGMENT} from '../GameParticipants/GameParticipants';

const GAME_BOARD_QUERY = gql`
  query GameQuery($code: String!) {
    game(code: $code) {
      id
      code
      duration
      ...turnOrderFragment
      gameParticipants {
        ...gameParticipantFragment
      }
      boardRows {
        ...BoardRowFragment
      }
    }
  }
  ${BOARD_ROW_FRAGMENT}
  ${GAME_PARTICIPANT_FRAGMENT}
  ${TURN_ORDER_FRAGMENT}
`;

const GameBoard: React.FC = () => {
  const {gameCode} = useParams();
  const {loading, error, data, subscribeToMore} = useQuery(GAME_BOARD_QUERY, {
    variables: {code: gameCode},
  });

  useEffect(() => {
    addSubscriptions({subscribeToMore, variables: {gameCode}});
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div>
      <h1>Game time!</h1>
      <h3>Game Code: {data.game.code}</h3>
      <GameDuration duration={data.game.duration} />
      <GameParticipants
        gameParticipants={data.game.gameParticipants}
        turnOrder={data.game.turnOrder}
      />
      <BoardRows boardRows={data.game.boardRows} />
    </div>
  );
};

export default GameBoard;
