import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import client from './components/ApolloClient';
import HelloWorld from './components/helloWorld';
import AppLayout from './components/appLayout';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AppLayout>
        <HelloWorld />
      </AppLayout>
    </ApolloProvider>
  );
};

export default App;
