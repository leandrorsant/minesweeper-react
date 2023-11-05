import React, { useRef } from 'react'
import { clickEvent, gameData, tileData } from '../constants/constants'
import '../styles/Tile.css'
import { IconBombFilled, IconFlag, IconFlame } from '@tabler/icons-react'
import { checkSolved, fillBoard, revealAdjancedTiles, revealEmptyAdjancedTiles, revealEmptyTiles } from './core'
import { Button } from '@mantine/core'

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



const Tile = ({tile, gameData}:
  {tile: tileData, 
    gameData : gameData
  }) => {



    const handleClick = (tile: tileData) => {
      console.log(checkSolved(gameData))
      if(tile.flagged || gameData.state === 'gameOver'){
        return;
      }
      let newBoard = gameData.board.slice();
  
      //checking if its the first click on the board
      if(gameData.state === 'firstClick'){
        gameData.state = 'playing'
        //generate a new board if first tile clicked contains a bomb
        while(newBoard[tile.x][tile.y].content !== 0){
          console.log('bomb')
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

      if(checkSolved(gameData)){
        gameData.state = 'complete'
        //alert('solved');
      }
      

      gameData.setGameBoard(revealEmptyTiles({type: 'left', x: tile.x, y: tile.y}, newBoard));
      gameData.setGameBoard(newBoard.map(function(e){return e;}))
    }

    const handleRightClick = (tileClick: clickEvent) =>{  
        if(!gameData.board[tileClick.x][tileClick.y].flagged){
          gameData.board[tileClick.x][tileClick.y].flagged = true;
        }else if(gameData.board[tileClick.x][tileClick.y].flagged){
          gameData.board[tileClick.x][tileClick.y].flagged = false
        }

        gameData.setGameBoard(gameData.board.map(function(e){return e;}))
    }

    const handleDoubleClick = (tile : tileData, gameData: gameData) => {
      if(gameData.state === 'gameOver'){
        return;
      }
      revealAdjancedTiles(tile, gameData);

      gameData.setGameBoard(gameData.board.map(function(e){return e;}))
    }

    const timer = useRef<NodeJS.Timeout>()
    const onClickHandler = (event: React.MouseEvent<Element, MouseEvent> ) => {
      clearTimeout(timer.current);
      if (event.detail === 1) {
          timer.current = setTimeout( () => handleClick(tile), 200)
      } else if (event.detail === 2) {
        handleDoubleClick(tile, gameData)
      }
  }

  return (
    <button style={ 
      gameData.state === 'complete' && tile.content === 1? 
      {backgroundColor: 'green', color: getHintColor(tile.hint)} : !tile.visible? 
      {backgroundColor: 'gray', color: getHintColor(tile.hint)} : 
      {backgroundColor: 'white', color: getHintColor(tile.hint)} 
    } 
      onClick={(e) => {
      onClickHandler(e)
    }}
    
    onContextMenu={(e) =>{
      e.preventDefault()
      const tileClick : clickEvent = {type: 'right', x: tile.x, y: tile.y};
      handleRightClick(tileClick)
    }}
    >
        {tile.flagged? <IconFlag color='green' size={20}/>:
        
        tile.content === 1 ? 
        <IconBombFilled color='red' size={20}/> 
        : tile.hint
         
          }

    </button>
  )
}

export default Tile