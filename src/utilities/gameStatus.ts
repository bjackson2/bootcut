export const gameCreated = (status: string): boolean => status === 'CREATED';
export const gameInProgress = (status: string): boolean =>
  status === 'IN_PROGRESS';
