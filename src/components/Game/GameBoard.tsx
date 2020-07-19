import React, {useEffect} from 'react';
import {useQuery, gql} from '@apollo/client';
import BoardRows from '../BoardRows';
import {useParams} from 'react-router-dom';
import {BOARD_ROW_FRAGMENT} from '../BoardRows/BoardRow';
import {Card, Image} from 'semantic-ui-react';
import {GameParticipant} from '../../types';

const GAME_BOARD_QUERY = gql`
  query GameQuery($code: String!) {
    game(code: $code) {
      id
      code
      gameParticipants {
        id
        name
        avatarUrl
      }
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

const GameBoard: React.FC = () => {
  const {gameCode} = useParams();
  const {loading, error, data, subscribeToMore} = useQuery(GAME_BOARD_QUERY, {
    variables: {code: gameCode},
  });

  useEffect(() => {
    subscribeToMore({
      document: BOARD_ROW_UPDATED_SUBSCRIPTION,
      variables: {gameCode},
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div>
      <h1>Game time!</h1>
      <h3>Game Code: {data.game.code}</h3>
      <h3>Players</h3>
      <Card.Group>
        {data.game.gameParticipants.map((p: GameParticipant) => (
          <Card key={p.id}>
            <Image src={p.avatarUrl} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{p.name}</Card.Header>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      <h3>Board Rows</h3>
      <BoardRows boardRows={data.game.boardRows} />
    </div>
  );
};

export default GameBoard;
