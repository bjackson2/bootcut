import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
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

const Game: React.FC = () => {
  const {id} = useParams();
  const {loading, error, data} = useQuery(GAME_QUERY, {variables: {id}});

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
