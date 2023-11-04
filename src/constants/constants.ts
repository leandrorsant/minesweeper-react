import { RefObject } from "react"


export type clickEvent = {
    type: "left"| "right",
    x: number,
    y: number
}


export type tileData = {
    content : number,
    hint : number,
    visible : boolean,
    x: number,
    y: number,
}