export interface BoardRow {
  id: string;
  activityDescription: string;
  rowNumber: number;
}

export interface Game {
  id: string;
  code: string;
}

export interface GameParticipant {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface CurrentGameParticipant {
  id: string;
  gameCode: string;
}
