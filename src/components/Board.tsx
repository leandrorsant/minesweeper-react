import React from 'react'
import { gameData, tileData } from '../constants/constants'
import '../styles/Board.css'
import { Center, Box  } from '@mantine/core'

import Tile from './Tile'
import { IconMoodSad, IconMoodSmileBeam } from '@tabler/icons-react'
import { reset } from './core'

const Board = ({board,gameData, setGameBoard}:{board: tileData[][], gameData: gameData, setGameBoard: Function}) => {
  return (
    <>
      <div style={{overflow: 'auto'}} >
        <Center>
          <Box onClick={() => reset(board, setGameBoard,gameData)}>
            {gameData.state !== 'gameOver'? 
              <IconMoodSmileBeam size={70}/> : 
              <IconMoodSad size={70}/>}
            </Box>
        </Center>

        {board.map( (row, _row_index) => (
          <Center key={_row_index}>
            <div style={{display: 'inline-block', minWidth:'fit-content'}}>
            {row.map( (t, _tile_index) => (
                <Tile key={String(_row_index)+ String(_tile_index)} tile={t} gameData={gameData} gameBoard={board} setGameBoard={setGameBoard}/>
            ))}
            </div>
            </Center>
        ) )}
    </div>
    </>
  )
}

export default Board