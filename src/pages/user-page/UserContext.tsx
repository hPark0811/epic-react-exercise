import React from 'react';

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

export {UserContext, UserProvider, useUser, set, reset}