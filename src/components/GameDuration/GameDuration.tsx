import React, {useState} from 'react';
import {gql} from '@apollo/client';
import {Form} from 'semantic-ui-react';
import {useMutation} from '@apollo/client';
import {useParams} from 'react-router-dom';

interface GameDurationProps {
  duration: number;
}

const UPDATE_GAME_DURATION_MUTATION = gql`
  mutation UpdateGameDuration($code: String!, $duration: Int) {
    updateGameDuration(code: $code, duration: $duration) {
      id
      duration
    }
  }
`;

const DEFAULT_HOURS = 2;
const generateSequence = (count: number): number[] => [
  ...Array(count + 1).keys(),
];
const getHours = (durationInMinutes: number | null) =>
  durationInMinutes ? Math.trunc(durationInMinutes / 60) : DEFAULT_HOURS;
const getMinutes = (durationInMinutes: number | null) =>
  durationInMinutes ? durationInMinutes % 60 : 0;

const GameDuration: React.FC<GameDurationProps> = ({duration}) => {
  const {gameCode} = useParams();
  const [formValues, updateFormValues] = useState({
    hours: getHours(duration),
    minutes: getMinutes(duration),
  });
  const [updateGameDuration] = useMutation(UPDATE_GAME_DURATION_MUTATION);

  return (
    <>
      <h3>Game Duration</h3>
      <Form>
        <Form.Group>
          <Form.Field>
            <label>Hours</label>
            <select
              placeholder="Hours"
              value={formValues.hours}
              onChange={({currentTarget: {value}}) => {
                updateFormValues({
                  ...formValues,
                  hours: Number(value),
                });
                updateGameDuration({
                  variables: {
                    code: gameCode,
                    duration: Number(value) * 60 + formValues.minutes,
                  },
                });
              }}
            >
              {generateSequence(24).map(o => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Form.Field>
          <Form.Field>
            <label>Minutes</label>
            <select
              placeholder="Minutes"
              value={formValues.minutes}
              onChange={({currentTarget: {value}}) => {
                updateFormValues({
                  ...formValues,
                  minutes: Number(value),
                });
                updateGameDuration({
                  variables: {
                    code: gameCode,
                    duration: formValues.hours * 60 + Number(value),
                  },
                });
              }}
            >
              {generateSequence(60).map(o => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  );
};

export default GameDuration;
