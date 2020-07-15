import React, {useState} from 'react';
import {Button, Input} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useHistory} from 'react-router-dom';

const CREATE_GAME = gql`
  mutation CreateGame($name: String) {
    createGame(name: $name) {
      id
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
  const [isCreatingGame, updateIsCreatingGame] = useState(false);
  const [gameName, updateGameName] = useState('');

  return (
    <section>
      <h1>Welcome to Bootcut!</h1>

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
