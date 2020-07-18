import React from 'react';
import {gql, useQuery} from '@apollo/client';
import GameBoard from './GameBoard';
import CreateGameParticipant from '../CreateGameParticipant';
import {useParams} from 'react-router-dom';

const GAME_PARTICIPANT_QUERY = gql`
  query GameParticipantQuery {
    currentGameParticipants @client
  }
`;

const Game: React.FC = () => {
  const {gameCode} = useParams();
  const {data, loading, error} = useQuery(GAME_PARTICIPANT_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return data.currentGameParticipants.find(
    (p: Record<string, string>) => p.gameCode === gameCode
  ) ? (
    <GameBoard />
  ) : (
    <CreateGameParticipant />
  );
};

export default Game;
