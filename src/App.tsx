import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppLayout from './components/appLayout';
import Home from './components/Home';
import Game from './components/Game';
import ApolloClient from './components/ApolloClient';

const App: React.FC = () => {
  return (
    <ApolloProvider client={ApolloClient}>
      <BrowserRouter>
        <AppLayout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/game/:gameCode">
              <Game />
            </Route>
          </Switch>
        </AppLayout>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
