import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useStickyState from '../../hooks/useStickyState';

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 80px 80px 80px;
  grid-template-rows: 80px 80px 80px;
  gap: 10px;
  margin-bottom: 30px;
`

const TicBox = styled.div`
  justify-self: stretch;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
type Board = Array<string | null>;
interface GameStatus {
  isGameOver: boolean,
  winner: string | null
}

const DEFAULT_BOARD: Board = Array(9).fill(null)
const DEFAULT_STATE: Board[] = [DEFAULT_BOARD]
const WINNING_SCENARIOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const TicTacToe = () => {
  const [snapshotId, setSnapshotId] = useStickyState(0, 'tictactoe:snapshotId')
  const [gameState, setGameState] = useStickyState<Board[]>(DEFAULT_STATE, 'tictactoe:gameState')
  const [gameStatus, setGameStatus] = useState<GameStatus>({ isGameOver: false, winner: null });
  const snapshot: Board = gameState[snapshotId];

  useEffect(() => {
    checkGameOver();
  }, [snapshotId])

  const onPlayerMove = (ndx: number) => {
    if (gameStatus.isGameOver) {
      console.warn("Can't update the existing tic!")
      return;
    }

    const newSnapshot = [...snapshot];
    const newSnapshotId = snapshotId + 1;

    const isOTurn = newSnapshot.filter((tic) => !tic).length % 2 === 0;

    newSnapshot[ndx] = isOTurn ? 'O' : 'X';

    setSnapshotId(newSnapshotId);
    setGameState([...gameState.slice(0, newSnapshotId), newSnapshot]);
  }

  const checkGameOver = () => {
    for (const [streakA, streakB, streakC] of WINNING_SCENARIOS) {
      if (snapshot[streakA] !== null
        && snapshot[streakB] === snapshot[streakA]
        && snapshot[streakB] === snapshot[streakC]) {
        setGameStatus({ isGameOver: true, winner: snapshot[streakA] });
        return;
      }
    }

    if (snapshotId >= 9) {
      setGameStatus({ isGameOver: true, winner: null });
      return;
    }

    setGameStatus({ isGameOver: false, winner: null });
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      {gameStatus.isGameOver
        && <h2>{gameStatus.winner ? `Winner is ${gameStatus.winner}` : 'Nobody won...'}</h2>}
      <TicTacToeBoard boardState={snapshot} onPlayerMove={onPlayerMove} />
      <div>
        {
          gameState.map((_, ndx) => {
            return <button onClick={setSnapshotId.bind(null, ndx)}>Snapshot {ndx}</button>
          })
        }
      </div>
    </>
  )
}

const TicTacToeBoard = (
  { boardState, onPlayerMove }: { boardState: Board, onPlayerMove: (ndx: number) => void }
) => (
  <GameContainer>
    {boardState.map(
      (tic, ndx) =>
        <TicBox
          key={ndx}
          onClick={onPlayerMove.bind(null, ndx)}>
          <span>{tic}</span>
        </TicBox>)}
  </GameContainer>
)

export default TicTacToe;