import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {Button, Card, Icon, Input} from 'semantic-ui-react';
import {BoardRow as BoardRowType} from '../../types';
import {useParams} from 'react-router-dom';

export const BOARD_ROW_FRAGMENT = gql`
  fragment BoardRowFragment on BoardRow {
    id
    rowNumber
    activityDescription
  }
`;

const UPDATE_BOARD_ROW = gql`
  mutation UpdateBoardRow(
    $gameId: String!
    $rowNumber: Int!
    $activityDescription: String!
  ) {
    updateBoardRow(
      gameId: $gameId
      rowNumber: $rowNumber
      activityDescription: $activityDescription
    ) {
      ...BoardRowFragment
    }
  }
  ${BOARD_ROW_FRAGMENT}
`;

const BoardRow: React.FC<BoardRowType> = ({rowNumber, activityDescription}) => {
  const {id: gameId} = useParams();
  const [isEditing, updateIsEditing] = useState(false);
  const [updateBoardRow, {loading: mutationLoading}] = useMutation(
    UPDATE_BOARD_ROW,
    {
      onCompleted: data => {
        console.log(data);
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
                      gameId,
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
