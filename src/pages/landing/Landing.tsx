import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <h1>
        Exercises
      </h1>
      <NavLink to="/tic-tac-toe"exact>
        Tic Tac Toe
      </NavLink>
    </>
  )
}

export default Landing;