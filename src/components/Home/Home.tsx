import React from 'react';
import {Button} from 'semantic-ui-react';
import {useMutation, useQuery, gql} from '@apollo/client';
import {useHistory, Link} from 'react-router-dom';
import {Game} from '../../types';

const CREATE_GAME = gql`
  mutation CreateGame {
    createGame {
      id
      code
    }
  }
`;
const GAMES_QUERY = gql`
  query GamesQuery {
    games {
      id
      code
    }
  }
`;

const Home: React.FC = () => {
  const history = useHistory();
  const [createGame, {loading: mutationLoading}] = useMutation(CREATE_GAME, {
    onCompleted: ({createGame: {code}}) => history.push(`/game/${code}`),
  });
  const {data, loading, error} = useQuery(GAMES_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <section>
      <h1>Welcome to Bootcut!</h1>

      <h3>Games</h3>

      {data.games.map((g: Game) => (
        <p key={g.id}>
          <Link to={`/game/${g.code}`}>{g.code}</Link>
        </p>
      ))}
      <Button
        primary
        loading={mutationLoading}
        onClick={(e: React.SyntheticEvent): void => {
          createGame();
          e.preventDefault();
        }}
      >
        Create Game!
      </Button>
    </section>
  );
};

export default Home;
