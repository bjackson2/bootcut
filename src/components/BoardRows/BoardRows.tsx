import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import BoardRow from './BoardRow';

const GET_BOARD_ROWS = gql`
  query GetBoardRows {
    boardRows {
      id
      rowNumber
      activityDescription
    }
  }
`;

interface BoardRow {
  id: number;
  activityDescription: string;
  rowNumber: number;
}

const BoardRows: React.FC = () => {
  const {loading, error, data} = useQuery(GET_BOARD_ROWS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div>
      {data.boardRows.map(({rowNumber, activityDescription}: BoardRow) => (
        <BoardRow
          key={rowNumber}
          rowNumber={rowNumber}
          activityDescription={activityDescription}
        />
      ))}
    </div>
  );
};

export default BoardRows;
