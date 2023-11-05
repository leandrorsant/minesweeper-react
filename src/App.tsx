import React, { useEffect, useState } from 'react';
import { clickEvent, gameData, tileData } from './constants/constants';
import Board from './components/Board';
import { fillBoard, revealEmptyTiles } from './components/core';
import { HEIGHT, WIDTH } from './constants/constants';








function App() {
  const [gameBoard, setGameboard] = useState<tileData[][]>(fillBoard(HEIGHT,WIDTH));
  const [gameData, setGameData] = useState<gameData>({
    state: "firstClick",
    board: gameBoard,
    setGameBoard: setGameboard,
    height: HEIGHT,
    width: WIDTH
  });

  

  const [tileClick, setTileClick] = useState<clickEvent>();
  if(gameBoard){

  }

  return (
    <div>
       {gameBoard && <Board board={gameBoard} gameData={gameData}/>}
    </div>
  );
}

export default App;
