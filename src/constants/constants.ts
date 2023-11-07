export let HEIGHT = 5
export let WIDTH = 5

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
    height: number,
    width: number,
}