import { clickEvent, gameData, tileData } from "../constants/constants";

export const revealEmptyTiles = (tileClick : clickEvent, board: tileData[][]) : any => {
    const HEIGHT = board.length
    const WIDTH = board[0].length;
  
  if((tileClick.x < 0 || tileClick.x >=HEIGHT) || (tileClick.y <0 || tileClick.y >= WIDTH) ){  
    return board;
  }
  
  if(board[tileClick.x][tileClick.y].hint !== 0 || board[tileClick.x][tileClick.y].visible){
    return board;
  }
  
  if(board[tileClick.x][tileClick.y].hint === 0){
      board[tileClick.x][tileClick.y].visible = true;
      revealEmptyTiles({type: 'left', x: tileClick.x, y: tileClick.y-1}, board.slice());
      revealEmptyTiles({type: 'left', x: tileClick.x, y: tileClick.y+1}, board.slice());
      revealEmptyTiles({type: 'left', x: tileClick.x-1, y: tileClick.y}, board.slice());
      revealEmptyTiles({type: 'left', x: tileClick.x+1, y: tileClick.y}, board.slice());

      revealEmptyTiles({type: 'left', x: tileClick.x-1, y: tileClick.y-1}, board.slice());
      revealEmptyTiles({type: 'left', x: tileClick.x+1, y: tileClick.y+1}, board.slice());
      revealEmptyAdjancedTiles(board[tileClick.x][tileClick.y],board)
      
    } 
  }

export const getBombCount = (x: number, y: number, board: tileData[][])=>{
    let bombCount = 0;
    const HEIGHT = board.length
    const WIDTH = board[0].length;
    
    if( x-1 >= 0 && y-1 >=0 ){
      if(board[x-1][y-1].content === 1){
        bombCount++;
      }
    }
    if(x-1 >= 0){
      if(board[x-1][y].content === 1){
        bombCount++;
      }
    }
    if(x-1>= 0 && y+1 < WIDTH){
      if(board[x-1][y+1].content === 1){
        bombCount++;
      }
    }
    if(y-1 >= 0){
      if(board[x][y-1].content === 1){
        bombCount++;
      }
    }
  
    if(y+1 < WIDTH){
      if(board[x][y+1].content === 1){
        bombCount++;
      }
    } 
    if( x+1 < HEIGHT && y-1 >= 0){
      if(board[x+1][y-1].content === 1){
        bombCount++;
      }
    } 
    if (x+1<HEIGHT){
      if(board[x+1][y].content === 1){
        bombCount++;
      }
    }
    if (x+1 < HEIGHT && y+1<WIDTH){
      if(board[x+1][y+1].content === 1){
        bombCount++;
      }
    }
    return bombCount;
  }

  export const fillBoard = (height: number, width: number) => {
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
          flagged: false,
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


  export const checkSolved = (gameData: gameData) => {
    
    for(let x=0;x<gameData.height;x++){
        for(let y=0;y<gameData.height;y++){
            if(gameData.board[x][y].content !== 1 && !gameData.board[x][y].visible){
                return false;
            }
        }
    }

    return true;
  }

  export const reset = (gameData: gameData)=>{
    window.location.reload()
  }

  export const revealAdjancedTiles = (tile :tileData, gameData: gameData) => {
    for(let x = tile.x-1; x<= tile.x+1;x++){
      for(let y = tile.y-1; y<= tile.y+1; y++){
        if((x >= 0 && x < gameData.height) && (y>=0 && y < gameData.width)){
          if(!gameData.board[x][y].flagged){
              gameData.board[x][y].visible = true;
            if(gameData.board[x][y].content === 1){
              gameData.state = 'gameOver';
            }
          }
        }
      }
    }
  }

  export const revealEmptyAdjancedTiles= (tile : tileData, board: tileData[][]) : tileData[][] => {
    const HEIGHT = board.length
    const WIDTH = board[0].length;

    for(let x = tile.x-1; x<= tile.x+1;x++){
      for(let y = tile.y-1; y<= tile.y+1; y++){
        if((x >= 0 && x < HEIGHT) && (y>=0 && y < WIDTH)){
          if(board[x][y].content !== 1)
              board[x][y].visible = true;
        }
      }
    }
    return board;
  }

  