import { useState, useEffect } from "react";

function useStickyState<T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    console.log(window?.localStorage.getItem(key));
    const stickyValue = window?.localStorage.getItem(key);

    return stickyValue ? JSON.parse(stickyValue) : defaultValue;
  }, [key]);

  useEffect(() => {
    window?.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue];
}

export default useStickyState;