import React, { useEffect, useRef, useState } from 'react';
import rollADie from 'roll-a-die';
import useSafeAsync from '../../hooks/useSafeAsync';

function DramaticDice() {
  const [rollStatus, setRollStatus] = useState("idle");
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [hideDiceComponent, setHideDiceComponent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const rollDice = () => {
    const val = inputRef?.current?.value;
    setDiceValue(parseInt(val || "0"));
  }

  return (
    <>
      <input type={'number'} ref={inputRef}></input>
      <button onClick={rollDice}>Roll</button>
      <br />
      <label htmlFor="diceStatus">Remove Dice Component</label>
      <input
        type={'checkbox'} id='diceStatus'
        checked={hideDiceComponent}
        onChange={(event) => { setHideDiceComponent(event.target.checked) }} />
      {!hideDiceComponent && <DiceView value={diceValue} getStatus={setRollStatus}></DiceView>}
    </>
  )
}

function DiceView({ value, getStatus }: { value: number | null, getStatus: React.Dispatch<React.SetStateAction<string>> }) {
  const diceRef = useRef<HTMLDivElement>(null);
  const { data, status, error, runFunction } = useSafeAsync({
    status: value ? "pending" : "idle"
  });

  useEffect(() => {
    getStatus(status)
  }, [status, getStatus])

  useEffect(() => {
    if (!diceRef?.current || value === null) {
      return;
    }
    runFunction(rollDice(value));
  }, [value, runFunction]);

  const rollDice: (val: number) => Promise<Response> = async (val: number) => {
    await timeout(3000);

    if (val < 1 || val > 6) {
      throw Error("Cannot be out of bound");
    }
    rollADie({ element: diceRef.current, numberOfDice: 1, callback: (_: any) => { }, values: [value] });
    return new Response();
  }

  return (
    <>
      <h3>Status: {status}</h3>
      <div ref={diceRef}></div>
    </>
  )
}

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default DramaticDice;