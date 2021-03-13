import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import TicTacToe from './pages/tic-tac-toe/TicTacToe';
import Tilt from './pages/tilt/Tilt';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* TODO: Organize route by react practice types */}
        <Route path="/"
          exact
          component={Landing} />

        {/* Hook Practices */}
        <Route path="/tic-tac-toe"
          component={TicTacToe} />
        <Route path="/tilt"
          component={Tilt} />


      </Switch>
    </BrowserRouter>
  );
}

export default App;
