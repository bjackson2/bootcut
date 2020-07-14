import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import client from './components/ApolloClient';
import BoardRows from './components/BoardRows';
import AppLayout from './components/appLayout';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <BoardRows />
      </AppLayout>
    </ApolloProvider>
  );
};

export default App;
