import React, { useRef } from 'react';
import { reset, set, UserProvider } from './UserContext';

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