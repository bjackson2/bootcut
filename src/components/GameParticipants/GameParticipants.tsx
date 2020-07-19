import React from 'react';
import {gql} from '@apollo/client';
import {Card, Image} from 'semantic-ui-react';
import {GameParticipant} from '../../types';

interface GameParticipantsProps {
  gameParticipants: GameParticipant[];
}

export const GAME_PARTICIPANT_FRAGMENT = gql`
  fragment gameParticipantFragment on GameParticipant {
    id
    name
    avatarUrl
  }
`;

const GameParticipants: React.FC<GameParticipantsProps> = ({
  gameParticipants,
}) => (
  <>
    <h3>Players</h3>
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
