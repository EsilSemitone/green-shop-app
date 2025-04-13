import { MouseEvent } from "react"

export interface IFilterItemEvent extends MouseEvent {
    target: ICategoryEventTarget
}

export interface ICategoryEventTarget extends EventTarget {
    textContent?: string
}