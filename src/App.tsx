import { useReducer, useState } from 'react';
import './App.css'
// import img from './img/space.jpg'
import { Board } from './components/Board';

type ReducerAction = {
  payload: any;
  type: 'OX' | 'NULL' | "SWITCH" | 'RESET';
}

export type stateType = {
  turn: "o" | 'x' | null;
  buttonState?: "o" | 'x' | 'eracer' | 'switch' | 'reset'|null;
  message: string;
  judge?: "draw" | 'win' | 'Game';
  winner?: "o" | 'x'|null;
}

const reducerFn = (state: stateType, action: ReducerAction) => {
  switch (action.type) {
    case 'OX':
      return { turn: action.payload, buttonState: action.payload, message: `Next player is ${action.payload}`,judge:'Game',winner:null }
    case "NULL":
      return { turn: action.payload, buttonState: 'eracer', message: `tap tile to erace`,judge:'Game',winner:null }
    case "SWITCH":
      if (state.buttonState == 'reset') { 
        return { turn: action.payload, buttonState: 'reset', message: 'Chose first player',judge:'Game',winner:null } 
      }
      else if (state.buttonState == 'eracer') { 
        return { turn: action.payload, buttonState: 'eracer', message: `tap tile to erace`,judge:'Game',winner:null } 
      }
      else if (state.judge === 'draw') { 
        return { turn: action.payload,buttonState:null, judge: 'draw', message: `${state.judge}`,winner:null } 
      }
      else if (state.judge !== 'win') {
        return (state.turn === 'o' ? 
        { turn: "x", buttonState:'x' ,message: `Next player is x`, judge: 'Game' ,winner:null } : { turn: "o",buttonState:'o', message: `Next player is o`, judge: 'Game' ,winner:null })
      } else { 
        return { turn: action.payload, buttonState:null, judge: 'win', message: `${state.winner} ${state.judge}`,winner:state.winner } 
      }
    case 'RESET':
      return { turn: action.payload, buttonState: 'reset', message: 'Chose first player', judge: 'Game' ,winner:null}
    default:
      return state
  }
}

function App() {
  const [board1, setBoard1] = useState<(string[] | null[])[]>([[null, null, null], [null, null, null], [null, null, null]]);
  const initialState= { turn: null, buttonState: 'reset', message: 'Chose first turn', judge: 'Game',winner:null };
  const [state, dispatchOX] = useReducer(reducerFn, initialState);
  const O = () => dispatchOX({ type: 'OX', payload: "o" });
  const X = () => dispatchOX({ type: 'OX', payload: "x" });
  const NULL = () => dispatchOX({ type: "NULL", payload: null });
  const setTurn = () => dispatchOX({ type: "SWITCH",payload:null });
  const reset = () => dispatchOX({ type: "RESET", payload:null });

  function handleTileClick(rowIndex: number, colIndex: number) {
    const newTiles = [...board1]
    if (state.judge !== 'win' && state.judge !== 'draw') { newTiles[rowIndex][colIndex] = state.turn; }
    setBoard1(newTiles);

    for (let i = 0; i < 3; i++) {
      if ((typeof newTiles[i][0] == 'string') && (newTiles[i][0] === newTiles[i][1]) && (newTiles[i][1] === newTiles[i][2])) {
        console.log(`${newTiles[i][0]} win`)
        state.judge = `win`
        state.winner = `${newTiles[i][0]}`
      }
    }
    for (let i = 0; i < 3; i++) {
      if ((typeof newTiles[0][i] == 'string') && (newTiles[0][i] === newTiles[1][i]) && (newTiles[1][i] === newTiles[2][i])) {
        console.log(`${newTiles[0][i]} win`)
        state.judge = `win`
        state.winner = `${newTiles[0][i]}`
      }
    }
    if ((typeof newTiles[0][0] == 'string') && (newTiles[0][0] === newTiles[1][1]) && (newTiles[1][1] === newTiles[2][2])) {
      console.log(`${newTiles[0][0]} win`)
      state.judge = `win`
      state.winner = `${newTiles[0][0]}`
    }
    if ((typeof newTiles[0][2] == 'string') && (newTiles[0][2] === newTiles[1][1]) && (newTiles[1][1] === newTiles[2][0])) {
      console.log(`${newTiles[0][2]} win`)
      state.judge = `win`
      state.winner = `${newTiles[0][2]}`
    }

    let filledTile: number = 0;
    newTiles.forEach(row => {
      row.forEach(col => {
        if (typeof col == 'string') { filledTile++ }
      })
    })
    if (state.judge !== 'win' && filledTile === 9) { state.judge = `draw` }
  }

  return (
    <>
      <div className='App' /* style={{ backgroundImage: `url(${img})` }}*/>
        <h1>tic-tac-toe</h1>
        <Board currentBoard={board1} onTileClick={handleTileClick} fn={state} setTurn={setTurn} />
        <div className='p'>{state.message} </div>
        <div className='buttons'>
          <span className='OX' onClick={O}>○</span>
          <span className='OX' onClick={X}>×</span>
          <span className='OX' style={{ color: 'black' }} onClick={NULL}>eracer</span>
          <span className='OX' style={{ color: 'black' }} onClick={setTurn}>switch </span>
          <span className='OX' style={{ color: 'black' }} onClick={() => {
            reset();
            setBoard1([[null, null, null], [null, null, null], [null, null, null]]);
          }
          }>reset</span>
        </div>
      </div>
    </>
  )
}
export default App
