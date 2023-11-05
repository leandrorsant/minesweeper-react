import { RefObject } from "react"

export let HEIGHT = 10
export let WIDTH = 10

export type clickEvent = {
    type: "left"| "right",
    x: number,
    y: number
}


export type tileData = {
    content : number,
    flagged: boolean,
    hint : number,
    visible : boolean,
    x: number,
    y: number,
}

export type gameData = {
    state: 'firstClick' | 'playing' | 'gameOver' | 'complete',
    board: tileData[][]
    setGameBoard: Function,
    height: number,
    width: number
}