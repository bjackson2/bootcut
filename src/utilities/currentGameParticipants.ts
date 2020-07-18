import {makeVar} from '@apollo/client';
import {CurrentGameParticipant} from '../types';

const getCurrentGameParticipants = (): CurrentGameParticipant[] =>
  JSON.parse(localStorage.getItem('CURRENT_GAME_PARTICIPANTS') || 'null') || [];
const setCurrentGameParticipants = (
  newGameParticipants: CurrentGameParticipant[]
): void => {
  localStorage.setItem(
    'CURRENT_GAME_PARTICIPANTS',
    JSON.stringify(newGameParticipants)
  );
};

export const currentGameParticipantsVar = makeVar(getCurrentGameParticipants());

export const updateCurrentGameParticipant = ({
  id,
  gameCode,
}: CurrentGameParticipant): void => {
  const currentGameParticipants = currentGameParticipantsVar();
  const newGameParticipants = [...currentGameParticipants, {id, gameCode}];

  setCurrentGameParticipants(newGameParticipants);
  currentGameParticipantsVar(newGameParticipants);
};
