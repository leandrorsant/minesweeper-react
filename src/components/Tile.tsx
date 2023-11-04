import React from 'react'
import { tileData } from '../constants/constants'
import './Tile.css'
import { IconBombFilled } from '@tabler/icons-react'

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

const Tile = ({tile, setTileClick}:{tile: tileData, setTileClick: Function}) => {



  return (
    <button style={!tile.visible? {backgroundColor: 'gray'} : {backgroundColor: 'white'} } 
      onClick={() => {
      setTileClick({type: 'left', x: tile.x, y: tile.y})
    }}>
        {tile.content == 1 ? 
        <IconBombFilled color='red' size={20}/> 
        : <span style={{color: getHintColor(tile.hint)}}>
          {tile.hint}
          </span>} 
    </button>
  )
}

export default Tile