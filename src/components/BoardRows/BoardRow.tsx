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

interface InputInterface extends Input {
  inputRef?: {
    current: {
      value: string;
    };
  };
}

const BoardRow: React.FC<BoardRowType> = ({rowNumber, activityDescription}) => {
  let activityDescriptionInput: InputInterface | null;
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
                defaultValue={activityDescription}
                ref={node => {
                  activityDescriptionInput = node;
                }}
              />
            ) : (
              activityDescription || <em>Click to edit...</em>
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
                      activityDescription:
                        activityDescriptionInput &&
                        activityDescriptionInput.inputRef &&
                        activityDescriptionInput.inputRef.current.value,
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
