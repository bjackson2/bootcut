import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Form, Button, Segment, Image} from 'semantic-ui-react';
import avatars from '../../utilities/avatars';
import chunk from 'lodash.chunk';
import {useParams} from 'react-router-dom';
import {updateCurrentGameParticipant} from '../../utilities/currentGameParticipants';

const CREATE_GAME_PARTICIPANT_MUTATION = gql`
  mutation CreateGameParticipant(
    $gameCode: String!
    $name: String!
    $avatarUrl: String!
  ) {
    createGameParticipant(
      gameCode: $gameCode
      name: $name
      avatarUrl: $avatarUrl
    ) {
      id
      name
      avatarUrl
    }
  }
`;

const CreateGameParticipant: React.FC = () => {
  const [formValues, updateFormValues] = useState({name: '', avatarName: ''});
  const {gameCode} = useParams();
  const [createGameParticipant, {loading}] = useMutation(
    CREATE_GAME_PARTICIPANT_MUTATION,
    {
      variables: {
        gameCode,
        name: formValues.name,
        avatarUrl: avatars[formValues.avatarName],
      },
      onCompleted: ({createGameParticipant: {id}}) => {
        updateCurrentGameParticipant({id, gameCode});
      },
    }
  );

  return (
    <div>
      <h1>Create a Player</h1>
      <Form onSubmit={() => createGameParticipant()}>
        <Form.Field>
          <label>Player Name</label>
          <input
            value={formValues.name}
            onChange={e =>
              updateFormValues({...formValues, name: e.target.value})
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Avatar</label>
          <Segment.Group>
            {chunk(Object.keys(avatars), 6).map(
              (row: string[], idx: number) => (
                <Segment.Group horizontal key={idx}>
                  {row.map((k: string, idx: number) => (
                    <Segment key={idx}>
                      <Form.Radio
                        value={k}
                        checked={formValues.avatarName === k}
                        onChange={() =>
                          updateFormValues({...formValues, avatarName: k})
                        }
                      />
                      <Image
                        src={avatars[k]}
                        size="tiny"
                        style={{cursor: 'pointer'}}
                        onClick={() =>
                          updateFormValues({...formValues, avatarName: k})
                        }
                      />
                    </Segment>
                  ))}
                </Segment.Group>
              )
            )}
          </Segment.Group>
        </Form.Field>
        <Button primary type="submit" disabled={loading} loading={loading}>
          Let&apos;s Go!
        </Button>
      </Form>
    </div>
  );
};

export default CreateGameParticipant;
