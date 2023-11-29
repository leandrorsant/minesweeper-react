import React, { useEffect, useReducer, useRef } from 'react'
import { clickEvent, gameData, tileData } from '../constants/constants'
import '../styles/Tile.css'
import { IconBombFilled, IconFlagFilled } from '@tabler/icons-react'
import { checkSolved, fillBoard, revealAdjancedTiles, revealEmptyTiles } from './core'


const getHintColor = (hint : number) => {
  if(hint === 1){
    return "blue"
  }
  if(hint === 2){
    return "green"
  }
  if(hint === 3){
    return "red"
  }
  if(hint === 4){
    return "darkblue"
  }
  if(hint === 5){
    return "#brown"
  }
  if(hint === 6){
    return "aqua"
  }
}



const Tile = ({tile, gameData, gameBoard, setGameBoard}:
  {tile: tileData, 
    gameData : gameData,
    gameBoard: tileData[][],
    setGameBoard: Function
  }) => {

    useEffect(()=>{
      if(checkSolved(gameBoard,gameData)){
        gameData.state = 'complete'
        console.log(gameData.state)
      }
    },[gameBoard, gameData]);

    const handleClick = (tile: tileData, board:tileData[][]) => {
      if(tile.flagged || gameData.state === 'gameOver'){
        return;
      }
      let newBoard = board.slice();
  
      //checking if its the first click on the board
      if(gameData.state === 'firstClick'){
        gameData.state = 'playing'
        //generate a new board if first tile clicked contains a bomb
        while(newBoard[tile.x][tile.y].content !== 0){
          newBoard = fillBoard(gameData.height,gameData.width);
        }
      }else{
        if(newBoard[tile.x][tile.y].content !== 0){
            gameData.state = 'gameOver'
        }
    }

      if(newBoard[tile.x][tile.y].hint !== 0){
        newBoard[tile.x][tile.y].visible = true;
      }
      
      //setGameBoard(revealEmptyTiles({type: 'left', x: tile.x, y: tile.y}, newBoard.map(function(e){return e;})));
      revealEmptyTiles({type: 'left', x: tile.x, y: tile.y}, newBoard.map(function(e){return e;}))
      setGameBoard(newBoard.map(function(e){return e;}))
    }

    const handleRightClick = (tileClick: clickEvent, board: tileData[][]) =>{  
        if(!board[tileClick.x][tileClick.y].flagged){
          board[tileClick.x][tileClick.y].flagged = true;
        }else if(board[tileClick.x][tileClick.y].flagged){
          board[tileClick.x][tileClick.y].flagged = false
        }
        setGameBoard(board.map(function(e){return e;}))
    }

    const handleDoubleClick = (tile : tileData, board: tileData[][],gameData: gameData) => {
      if(gameData.state === 'gameOver'){
        return;
      }
      revealAdjancedTiles(tile, board, gameData);
      setGameBoard(board.map(function(e){return e;}))
    }

    const timer = useRef<NodeJS.Timeout>()
    const onClickHandler = (event: React.MouseEvent<Element, MouseEvent> ) => {
      clearTimeout(timer.current);
      if (event.detail === 1) {
          timer.current = setTimeout( () => handleClick(tile,gameBoard), 200)
      } else if (event.detail === 2) {
        handleDoubleClick(tile, gameBoard, gameData)
      }
  }

  return (
    <button style={ 
      gameData.state === 'complete' && tile.content === 1? 
      {backgroundColor: 'green'} : 
      gameData.state === 'gameOver' && tile.content === 1? 
      {backgroundColor: 'red'} : 
      !tile.visible? 
      {backgroundColor: 'gray'} : 
      {backgroundColor: 'white'} 
    } 
      onClick={(e) => {
      onClickHandler(e)
    }}
    
    onContextMenu={(e) =>{
      e.preventDefault()
      const tileClick : clickEvent = {type: 'right', x: tile.x, y: tile.y};
      handleRightClick(tileClick, gameBoard)
    }}
    >
        {
          gameData.state === 'gameOver' && tile.content == 1?
          <IconBombFilled size={20} />:
         //true? (
          tile.visible? (
            tile.content === 1? 
              <IconBombFilled size={20} /> :
            tile.hint !== 0?
            <span style={{color: getHintColor(tile.hint)}}>{tile.hint}</span>:
              <span className='hidden'>-</span>)
          : 
          tile.flagged?
          <IconFlagFilled size={18}/>: 
          <span className='hidden'>-</span>
        }

    </button>
  )
}

export default Tile