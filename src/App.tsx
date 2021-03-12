import React from 'react';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import TicTacToe from './pages/tic-tac-toe/TicTacToe';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/"
          exact
          component={Landing} />
        <Route path="/tic-tac-toe"
          component={TicTacToe} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
