import React from 'react';
import {default as BoardRowComponent} from './BoardRow';
import {BoardRow} from '../../types';

interface BoardRowsProps {
  boardRows: BoardRow[];
}

const BoardRows: React.FC<BoardRowsProps> = ({boardRows}) => (
  <div>
    {boardRows.map((boardRow: BoardRow) => (
      <BoardRowComponent key={boardRow.rowNumber} {...boardRow} />
    ))}
  </div>
);

export default BoardRows;
