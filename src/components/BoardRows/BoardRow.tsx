import React, {useState} from 'react';
import {Button, Card, Input, Grid} from 'semantic-ui-react';
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
    <Card
      fluid
      style={{cursor: 'pointer'}}
      onClick={() => updateIsEditing(true)}
    >
      <Card.Content style={{lineHeight: '2.5em', color: 'black'}}>
        <Grid stackable>
          <Grid.Column width={14}>
            {isEditing ? (
              <Input
                fluid
                value={activityDescriptionInput}
                onChange={(e): void =>
                  updateActivityDescriptionInput(e.currentTarget.value)
                }
              />
            ) : (
              activityDescription
            )}
          </Grid.Column>
          {isEditing && (
            <Grid.Column textAlign="center" width={2}>
              <Button
                primary
                loading={mutationLoading}
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
                Save
              </Button>
            </Grid.Column>
          )}
        </Grid>
      </Card.Content>
      <Card.Content extra>Row number: {rowNumber}</Card.Content>
    </Card>
  );
};

export default BoardRow;
