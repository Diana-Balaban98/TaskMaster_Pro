import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

export let todolistID1 = v1();
export let todolistID2 = v1();

let initialState: TodolistType[] = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state = initialState, action: ActionTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.todolistId, title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        case "SET-TODOS":
            const copyState = {...state}
            action.todos.forEach(el => {
                copyState[el.id] = []
            })
            return copyState
        default:
            return state
    }
}

export type ActionTypes = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType | ChangeFilterACType | SetTodosType

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
    type: "CHANGE-TODOLIST-TITLE",
    payload: {id, title}
} as const)

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {id, filter}
} as const)

type SetTodosType = ReturnType<typeof setTodosAC>

export const setTodosAC = (todos: TodolistType[]) => ({type: "SET-TODOS", todos} as const)