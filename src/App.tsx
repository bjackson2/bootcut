import {ApolloProvider} from '@apollo/react-hooks';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import client from './components/ApolloClient';
import AppLayout from './components/appLayout';
import Home from './components/Home';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppLayout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/game/:id">
              <Game />
            </Route>
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
