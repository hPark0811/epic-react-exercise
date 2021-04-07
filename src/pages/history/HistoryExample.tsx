import { throws } from 'node:assert';
import React, { ReducerAction, useEffect } from 'react';

const UNDO = 'UNDO';
const REDO = 'REDO';
const SET = 'SET';
const RESET = 'RESET';

function undoReducer(state: { past: any[], present: any, future: any[] }, action: any) {
  const { past, present, future } = state;
  const { type, newPresent } = action;

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  switch (type) {
    case UNDO: {
      if (!canUndo) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    }

    case REDO: {
      if (!canRedo) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    }

    case SET: {
      if (present === newPresent) return state;

      const newPast = [...past, present];

      return {
        past: newPast,
        present: newPresent,
        future: []
      }
    }

    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    }

    default: {
      throw `Unhandled ${action} used`;
    }
  }
}

function useUndo(initialPresent: any) {
  const [state, dispatch] = React.useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  })

  const undo = React.useCallback(() => {
    dispatch({ type: UNDO })
  }, []);

  const redo = React.useCallback(() => {
    dispatch({ type: REDO })
  }, []);

  const set = React.useCallback(
    newPresent => {
      dispatch({ type: SET, newPresent })
    },
    []);

  const reset = React.useCallback(
    newPresent => {
      dispatch({ type: RESET, newPresent: initialPresent })
    },
    [])

  return [
    state,
    { set, reset, undo, redo }
  ]
}

const HistoryExample = () => {
  // @ts-ignore
  const [state, { set, reset, undo, redo }] = useUndo(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // @ts-ignore
  useEffect(() => { set('second') }, [set]);

  // @ts-ignore
  useEffect(() => { set('third') }, [set]);

  return (
    <div>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
      <input type='number' ref={inputRef} />
      {/* @ts-ignore */}
      <button onClick={() => { inputRef.current?.value && set(inputRef.current.value) }}>set</button>
      <button onClick={reset}>reset</button>
      <button onClick={undo}>undo</button>
      <button onClick={redo}>redo</button>
    </div>
  )
}

export default HistoryExample;