import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <h1>
        Exercises
      </h1>
      <ul>
        <li>
          <NavLink to="/tic-tac-toe" exact>Tic Tac Toe</NavLink>
        </li>
        <li>
          <NavLink to="/tilt" exact>Tilt</NavLink>
        </li>
        <li>
          <NavLink to="/dramatic-dice" exact>Dramatic Dice</NavLink>
        </li>
        <li>
          <NavLink to="/scrolley" exact>Scrolley</NavLink>
        </li>
        <li>
          <NavLink to="/history" exact>History</NavLink>
        </li>
        <li>
          <NavLink to="/user" exact>User</NavLink>
        </li>
        <li>
          <NavLink to="/accordion" exact>Accordion</NavLink>
        </li>
        <li>
          <NavLink to="/toggle" exact>Toggle</NavLink>
        </li>
      </ul>

    </>
  )
}

export default Landing;