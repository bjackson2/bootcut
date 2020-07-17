import React, {useState} from 'react';
import {Button, Input} from 'semantic-ui-react';
import {useMutation, useQuery, gql} from '@apollo/client';
import {useHistory, Link} from 'react-router-dom';
import {Game} from '../../types';

const CREATE_GAME = gql`
  mutation CreateGame($name: String) {
    createGame(name: $name) {
      id
      shortCode
    }
  }
`;
const GAMES_QUERY = gql`
  query GamesQuery {
    games {
      id
      name
      shortCode
    }
  }
`;

const Home: React.FC = () => {
  const history = useHistory();
  const [createGame] = useMutation(CREATE_GAME, {
    onCompleted: ({createGame: {shortCode}}) =>
      history.push(`/game/${shortCode}`),
  });
  const {data, loading, error} = useQuery(GAMES_QUERY);
  const [isCreatingGame, updateIsCreatingGame] = useState(false);
  const [gameName, updateGameName] = useState('');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;
  return (
    <section>
      <h1>Welcome to Bootcut!</h1>

      <h3>Games</h3>

      {data.games.map((g: Game) => (
        <div key={g.id}>
          <Link to={`/game/${g.shortCode}`}>{g.name}</Link>
        </div>
      ))}
      {isCreatingGame ? (
        <div>
          <Input
            placeholder="Game name"
            value={gameName}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              updateGameName(e.currentTarget.value)
            }
          />
          <Button
            primary
            onClick={(e: React.SyntheticEvent): void => {
              createGame({variables: {name: gameName}});
              e.preventDefault();
            }}
          >
            Create Game!
          </Button>
        </div>
      ) : (
        <Button
          basic
          onClick={(e: React.SyntheticEvent): void => {
            updateIsCreatingGame(true);
            e.preventDefault();
          }}
        >
          New Game
        </Button>
      )}
    </section>
  );
};

export default Home;
