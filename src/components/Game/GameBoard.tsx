import React, {useEffect} from 'react';
import {useQuery, gql, useMutation} from '@apollo/client';
import {useParams} from 'react-router-dom';
import BoardRows, {BOARD_ROW_FRAGMENT} from '../BoardRows';
import GameParticipants, {GAME_PARTICIPANT_FRAGMENT} from '../GameParticipants';
import GameDuration from '../GameDuration';
import addSubscriptions from '../subscriptions';
import {TURN_ORDER_FRAGMENT} from '../GameParticipants/GameParticipants';
import {gameCreated, gameInProgress} from '../../utilities/gameStatus';
import {Button} from 'semantic-ui-react';

const GAME_BOARD_QUERY = gql`
  query GameQuery($code: String!) {
    game(code: $code) {
      id
      code
      duration
      status
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
const UPDATE_GAME_STATUS_MUTATION = gql`
  mutation UpdateGameStatus($code: String!, $status: GameStatus) {
    updateGameStatus(code: $code, status: $status) {
      id
      status
    }
  }
`;

const GameBoard: React.FC = () => {
  const {gameCode} = useParams();
  const {loading, error, data, subscribeToMore} = useQuery(GAME_BOARD_QUERY, {
    variables: {code: gameCode},
  });
  const [updateGameStatus, {loading: updateGameStatusLoading}] = useMutation(
    UPDATE_GAME_STATUS_MUTATION
  );

  useEffect(() => {
    addSubscriptions({subscribeToMore, variables: {gameCode}});
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  const {
    game: {code, status, duration, gameParticipants, turnOrder, boardRows},
  } = data;

  return (
    <div>
      {gameCreated(status) && <h1>Set up the game</h1>}
      {gameInProgress(status) && <h1>It&apos;s Bootcut Time</h1>}
      {gameCreated(status) && (
        <p>
          Set the game duration and board rows, then click &apos;Start
          Game&apos;!
        </p>
      )}
      {gameInProgress(status) && <h3>Game Code: {code}</h3>}
      {gameCreated(status) && <GameDuration duration={duration} />}
      <GameParticipants
        gameParticipants={gameParticipants}
        turnOrder={turnOrder}
      />
      <BoardRows boardRows={boardRows} />
      {gameCreated(status) && (
        <Button
          primary
          onClick={() => {
            updateGameStatus({
              variables: {code: gameCode, status: 'IN_PROGRESS'},
            });
            window.scrollTo(0, 0);
          }}
          loading={updateGameStatusLoading}
        >
          Start Game
        </Button>
      )}
    </div>
  );
};

export default GameBoard;
