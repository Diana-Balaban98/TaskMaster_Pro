import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: ActionTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.todolistId, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}
export type ActionTypes = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {title},
        todolistId: v1()
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: "CHANGE_TODOLIST_TITLE",
    payload: {id, title}
} as const)

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE_TODOLIST_FILTER",
    payload: {id, filter}
} as const)