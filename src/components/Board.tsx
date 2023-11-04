import React from 'react'
import { tileData } from '../constants/constants'
import Tile from './Tile'

const Board = ({board, setTileClick}:{board: tileData[][], setTileClick: Function}) => {
  return (
    <>
        {board.map( (row, _row_index) => (
        <div key={_row_index}>
            {row.map( (t, _tile_index) => (
                <Tile key={String(_row_index)+ String(_tile_index)} tile={t} setTileClick={setTileClick} />
            ))}
        </div>
        ) )}
    </>
  )
}

export default Board