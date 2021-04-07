import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/landing/Landing';
import DramaticDice from './pages/dramatic-dice/DramaticDice';
import TicTacToe from './pages/tic-tac-toe/TicTacToe';
import Tilt from './pages/tilt/Tilt';
import Scrolley from './pages/scrolley/Scrolley';
import HistoryExample from './pages/history/HistoryExample';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* TODO: Organize route by react practice types */}
        <Route path="/"
          exact
          component={Landing} />

        {/* Hook Practices */}
        {/* useState exercise */}
        <Route path="/tic-tac-toe"
          component={TicTacToe} />
        {/* useRef exercise */}
        <Route path="/tilt"
          component={Tilt} />
        {/* Safely handling async operator */}
        <Route path="/dramatic-dice"
          component={DramaticDice} />
        {/* Exposing properties to the parent */}
        <Route path="/scrolley"
          component={Scrolley} />
        {/* useState vs useReducer, when to use which */}
        <Route path="/history"
          component={HistoryExample} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
