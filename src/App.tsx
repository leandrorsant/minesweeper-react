import React, { useState } from 'react';
import { gameData, tileData } from './constants/constants';
import Board from './components/Board';
import { fillBoard } from './components/core';
import { HEIGHT, WIDTH } from './constants/constants';


function App() {
  const [gameBoard, setGameboard] = useState<tileData[][]>(fillBoard(HEIGHT,WIDTH));
  const [gameData, setGameData] = useState<gameData>({
    state: "firstClick",
    height: HEIGHT,
    width: WIDTH
  });

  return (
    <div>
       {gameBoard && <Board board={gameBoard} setGameBoard={setGameboard} gameData={gameData}/>}
    </div>
  );
}

export default App;
