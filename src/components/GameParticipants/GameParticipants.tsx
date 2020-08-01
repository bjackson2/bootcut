import React from 'react';
import {gql} from '@apollo/client';
import {Card, Image} from 'semantic-ui-react';
import {GameParticipant} from '../../types';

interface GameParticipantsProps {
  gameParticipants: GameParticipant[];
  turnOrder: number[];
}

export const GAME_PARTICIPANT_FRAGMENT = gql`
  fragment gameParticipantFragment on GameParticipant {
    id
    name
    avatarUrl
  }
`;

export const TURN_ORDER_FRAGMENT = gql`
  fragment turnOrderFragment on Game {
    id
    turnOrder
  }
`;

const GameParticipants: React.FC<GameParticipantsProps> = ({
  gameParticipants,
  turnOrder,
}) => (
  <>
    <h3>Players</h3>
    <div>Turn order {turnOrder}</div>
    <Card.Group>
      {gameParticipants.map((p: GameParticipant) => (
        <Card key={p.id}>
          <Image src={p.avatarUrl} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{p.name}</Card.Header>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  </>
);

export default GameParticipants;
