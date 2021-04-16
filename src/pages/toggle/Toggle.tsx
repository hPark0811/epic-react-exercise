//@ts-nocheck TODO: Remove this later
import React from 'react';

const actionTypes = {
  toggle: 'TOGGLE',
  on: 'ON',
  off: 'OFF',
}

function toggleReducer(state, action) {
  console.log('hello');
  switch (action.type) {
    case actionTypes.toggle: {
      return { on: !state.on }
    }
    case actionTypes.on: {
      return { on: true }
    }
    case actionTypes.off: {
      return { on: false }
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`)
    }
  }
}

function useToggle({reducer = toggleReducer} = {}) {
  const [{ on }, dispatch] = React.useReducer(reducer, { on: false })
  const toggle = () => dispatch({ type: actionTypes.toggle })
  const setOn = () => dispatch({ type: actionTypes.on })
  const setOff = () => dispatch({ type: actionTypes.off })
  return { on, toggle, setOn, setOff }
}

function Toggle() {
  let [clickCount, setClickCount] = React.useState(0);
  const tooManyClicks = clickCount >= 4;

  const { on, toggle, setOn, setOff } = useToggle({
    reducer(currentState, action) {
      const changes = toggleReducer(currentState, action)

      if (tooManyClicks && action.type === actionTypes.toggle) {
        return {...changes, on: currentState.on}
      }
      else {
        return changes;
      }
    }
  })

  const customToggle = () => {
    toggle();
    setClickCount(c => c + 1);
  }

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <div style={{ backgroundColor: on ? 'green' : 'red', width: 100, height: 100 }} onClick={customToggle}></div>
      {tooManyClicks ? (
        <button onClick={() => setClickCount(0)}>Reset</button>
      ) : null}
    </div>
  )
}

export default Toggle;