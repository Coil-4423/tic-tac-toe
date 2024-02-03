import { stateType } from "../App";

type currentBoardType={
    currentBoard:(string|null)[][]
    onTileClick:(a:number,b:number)=>void
    fn:stateType;
    setTurn:() => void
  }
  
 export function Board({ currentBoard ,onTileClick,fn,setTurn}:currentBoardType) {
    return (
      <div className="board">
        {currentBoard.map((row, rowIndex) => (
          <div className="row" key={`${rowIndex}`}>
            {row.map((val, colIndex) => (
              <div className="cell" key={`${rowIndex}-${colIndex}`} onClick={()=>{
                if(fn.judge!=='win'&&fn.judge!=='draw')setTurn();
                onTileClick(rowIndex,colIndex);
              }} >{val}</div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  