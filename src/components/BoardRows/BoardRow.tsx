import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {Button, Card, Icon, Input} from 'semantic-ui-react';

const UPDATE_BOARD_ROW = gql`
  mutation UpdateBoardRow($rowNumber: Int!, $activityDescription: String!) {
    updateBoardRow(
      rowNumber: $rowNumber
      activityDescription: $activityDescription
    ) {
      id
      activityDescription
      rowNumber
    }
  }
`;

interface BoardRowProps {
  rowNumber: number;
  activityDescription: string;
}

const BoardRow: React.FC<BoardRowProps> = ({
  rowNumber,
  activityDescription,
}) => {
  const [isEditing, updateIsEditing] = useState(false);
  const [updateBoardRow, {loading: mutationLoading}] = useMutation(
    UPDATE_BOARD_ROW,
    {
      onCompleted: () => updateIsEditing(false),
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
                onChange={e => updateActivityDescriptionInput(e.target.value)}
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
                onClick={() => {
                  updateBoardRow({
                    variables: {
                      rowNumber,
                      activityDescription: activityDescriptionInput,
                    },
                  });
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
