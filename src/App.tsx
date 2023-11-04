import React, { useEffect, useState } from 'react';
import { clickEvent, tileData } from './constants/constants';
import Board from './components/Board';


const getBombCount = (x: number, y: number, board: tileData[][])=>{
  let bombCount = 0;
  const HEIGHT = board.length
  const WIDTH = board[0].length;
  
  if( x-1 >= 0 && y-1 >=0 ){
    if(board[x-1][y-1].content == 1){
      bombCount++;
    }
  }
  if(x-1 >= 0){
    if(board[x-1][y].content == 1){
      bombCount++;
    }
  }
  if(x-1>= 0 && y+1 < WIDTH){
    if(board[x-1][y+1].content == 1){
      bombCount++;
    }
  }
  if(y-1 >= 0){
    if(board[x][y-1].content == 1){
      bombCount++;
    }
  }

  if(y+1 < WIDTH){
    if(board[x][y+1].content == 1){
      bombCount++;
    }
  } 
  if( x+1 < HEIGHT && y-1 >= 0){
    if(board[x+1][y-1].content == 1){
      bombCount++;
    }
  } 
  if (x+1<HEIGHT){
    if(board[x+1][y].content == 1){
      bombCount++;
    }
  }
  if (x+1 < HEIGHT && y+1<WIDTH){
    if(board[x+1][y+1].content == 1){
      bombCount++;
    }
  }
  return bombCount;
}

const fillBoard = (height: number, width: number) => {
  const HEIGHT = height;
  const WIDTH = width

  let newBoard: tileData[][] = []
  //Fill array with bombs and blank tiles
  for(let x=0; x<HEIGHT;x++){
    let row : tileData[] = []
    for(let y =0;y<WIDTH;y++){
      let tile : tileData = { 
        content: Math.random(), 
        hint :0, 
        visible: false,
        x: x,
        y: y
      };

      tile.content = tile.content < 0.2 ? 1 : 0;
      row.push(tile);
    }
    newBoard.push(row);
  }

  //Fill hints
  for(let x=0; x<HEIGHT;x++){
    for(let y =0;y<WIDTH;y++){
      const hint = getBombCount(x, y, newBoard);
      newBoard[x][y].hint = hint;
    }
    
  }

  return newBoard
} 

const handleTitleClick = (tileClick : clickEvent, board: tileData[][]) => {
  const HEIGHT = board.length
  const WIDTH = board[0].length;

  
}


function App() {
  const [gameBoard, setGameboard] = useState<tileData[][]>(fillBoard(8,8));
  const [tileClick, setTileClick] = useState<clickEvent>();
  if(gameBoard){

  }

  gameBoard && gameBoard.forEach(
    row => {
      console.log(row.map((t) => t))
    })
 
  useEffect(()=> {
    if(tileClick){
      gameBoard[tileClick.x][tileClick.y].visible = true;
      handleTitleClick(tileClick, gameBoard);
      setGameboard(gameBoard.slice())
    }
  }, [tileClick])


  return (
    <div>
       {gameBoard && <Board board={gameBoard} setTileClick = {setTileClick}/>}
    </div>
  );
}

export default App;
