import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import client from './components/ApolloClient';
import HelloWorld from './components/helloWorld';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <HelloWorld />
    </ApolloProvider>
  );
};

export default App;
