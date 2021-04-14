import React, { useRef } from 'react';

interface UserInfo {
  name: string,
  tag?: string,
  biography?: string
}

const UserContext = React.createContext({state: null});

function UserProvider({ userInfo = { name: 'Heung' }, ...props }: any) {
  const [state, dispatch] = React.useReducer(
    //@ts-ignore
    (state, action) => {
      switch (action.type) {
        case 'SET': {
          return { ...state, userInfo: action.userInfo }
        }
        case 'RESET': {
          return { ...state, userInfo }
        }
        default: {
          throw new Error(`Unhandled action type: ${action.type}`)
        }
      }
    },
    { userInfo }
  )

  const value = [state, dispatch]

  return <UserContext.Provider value={value} {...props} />
}

function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useCounter must be used within a UserProvider')
  }
  return context;
}

//@ts-ignore
const set = (dispatch, userInfo) => dispatch({ type: 'SET', userInfo })
//@ts-ignore
const reset = dispatch => dispatch({ type: 'RESET' })

const User = () => {
  return (
    <UserProvider>
      <UserForm />
    </UserProvider>
  )
}

const UserForm = () => {
  //@ts-ignore
  const [state, dispatch] = useUser();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const bioInputRef = useRef<HTMLInputElement>(null);

  const setUser = () => {
    set(
      dispatch,
      {
        name: nameInputRef.current?.value || '',
        tag: tagInputRef.current?.value,
        biography: bioInputRef.current?.value
      }
    )
  }

  return (
    <div>
      <pre>
        {JSON.stringify(state, null, 2)}
      </pre>
      <label>Username</label>
      <input type="text" ref={nameInputRef}></input>
      <label>Tagline</label>
      <input type="text" ref={tagInputRef}></input>
      <label>Biography</label>
      <input type="text" ref={bioInputRef}></input>
      <br />
      <button onClick={setUser}>Set</button>
      <button onClick={reset.bind(null, dispatch)}>Reset</button>
    </div>
  )
}

export default User;