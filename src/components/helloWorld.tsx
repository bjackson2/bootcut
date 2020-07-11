import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

const HELLO_WORLD_QUERY = gql`
  query helloWorldQuery {
    hello
  }
`;

const HelloWorld: React.FC = () => {
  const {loading, error, data} = useQuery(HELLO_WORLD_QUERY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  return <div>{data.hello}</div>;
};

export default HelloWorld;
