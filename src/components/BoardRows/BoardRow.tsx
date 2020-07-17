import React, {useState} from 'react';
import {Button, Card, Icon, Input} from 'semantic-ui-react';
import {BoardRow as BoardRowType} from '../../types';
import {useParams} from 'react-router-dom';
import {useMutation, gql} from '@apollo/client';

export const BOARD_ROW_FRAGMENT = gql`
  fragment BoardRowFragment on BoardRow {
    id
    rowNumber
    activityDescription
  }
`;

const UPDATE_BOARD_ROW = gql`
  mutation UpdateBoardRow(
    $gameCode: String!
    $rowNumber: Int!
    $activityDescription: String!
  ) {
    updateBoardRow(
      gameCode: $gameCode
      rowNumber: $rowNumber
      activityDescription: $activityDescription
    ) {
      ...BoardRowFragment
    }
  }
  ${BOARD_ROW_FRAGMENT}
`;

const BoardRow: React.FC<BoardRowType> = ({rowNumber, activityDescription}) => {
  const {gameCode} = useParams();
  const [isEditing, updateIsEditing] = useState(false);
  const [updateBoardRow, {loading: mutationLoading}] = useMutation(
    UPDATE_BOARD_ROW,
    {
      onCompleted: () => {
        updateIsEditing(false);
      },
    }
  );
  const [activityDescriptionInput, updateActivityDescriptionInput] = useState(
    activityDescription
  );

  return (
    <Card fluid>
      <Card.Content>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            {isEditing ? (
              <Input
                value={activityDescriptionInput}
                onChange={(e: React.FormEvent<HTMLInputElement>): void =>
                  updateActivityDescriptionInput(e.currentTarget.value)
                }
              />
            ) : (
              activityDescription
            )}
          </div>
          <div>
            {isEditing ? (
              <Button
                icon
                basic
                loading={mutationLoading}
                style={{padding: '12px'}}
                onClick={(e: React.SyntheticEvent) => {
                  updateBoardRow({
                    variables: {
                      gameCode,
                      rowNumber,
                      activityDescription: activityDescriptionInput,
                    },
                  });
                  e.preventDefault();
                }}
              >
                <Icon name="save outline" />
              </Button>
            ) : (
              <Button
                icon
                basic
                style={{padding: '12px'}}
                onClick={() => updateIsEditing(true)}
              >
                <Icon name="edit outline" />
              </Button>
            )}
          </div>
        </div>
      </Card.Content>
      <Card.Content extra>Row number: {rowNumber}</Card.Content>
    </Card>
  );
};

export default BoardRow;
