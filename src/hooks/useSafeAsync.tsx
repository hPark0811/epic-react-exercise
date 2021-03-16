import { useReducer, Reducer, ReducerState, useCallback, useRef, useLayoutEffect, ReducerAction } from 'react';

interface CustomReducer extends Reducer<any, any> {
  status: any,
  data: any,
  error: any
}

function useSafeAsync(initialState: any) {
  const [state, unsafeDispatch] = useReducer(
    asyncReducer,
    {
      status: "idle",
      data: null,
      error: null,
      ...initialState
    }
  );

  let dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const runFunction = useCallback(
    (promise: Promise<any>) => {
      dispatch({ type: "pending" });
      promise.then(
        data => dispatch({ type: "resolved", data, error: null }),
        error => dispatch({ type: "rejected", error, data: null })
      )
    },
    [dispatch]
  );

  const reset = useCallback(() => dispatch({ type: "type" }), [dispatch]);

  return { error, status, data, runFunction, reset }
}

function asyncReducer(
  state: ReducerState<CustomReducer>,
  action: ReducerAction<CustomReducer>
): ReducerState<CustomReducer> {
  console.log(action);
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null }
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null }
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useSafeDispatch(unsafeDispatchFunction: (...args: any[]) => any): (...args: any[]) => void{
  const isMountedRef = useRef(false)

  // why use layout effect ?
  // this effect is called before the component is
  // shown on the screen, while use effect is called after
  // in our case:
  // we would want to switch (or ignore updates) as quickly as possible
  useLayoutEffect(() => {
    isMountedRef.current = true
    return () => { isMountedRef.current = false }
  })

  const safeDispatchFunction = useCallback(
    (...args) => {
      isMountedRef.current ? unsafeDispatchFunction(...args) : (void 0)
    },
    [unsafeDispatchFunction]
  )

  return safeDispatchFunction
}

export default useSafeAsync;