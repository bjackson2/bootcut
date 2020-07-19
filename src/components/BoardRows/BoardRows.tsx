import React from 'react';
import {default as BoardRowComponent} from './BoardRow';
import {BoardRow} from '../../types';

interface BoardRowsProps {
  boardRows: BoardRow[];
}

const BoardRows: React.FC<BoardRowsProps> = ({boardRows}) => (
  <>
    <h3>Board Rows</h3>
    {boardRows.map((boardRow: BoardRow) => (
      <BoardRowComponent key={boardRow.rowNumber} {...boardRow} />
    ))}
  </>
);

export default BoardRows;
