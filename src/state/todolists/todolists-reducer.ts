import {v1} from "uuid";
import {TodolistType} from "../../api/todolists-api";

// export let todolistID1 = v1();
// export let todolistID2 = v1();

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

// types actions (objects)
export type ActionTypes = RemoveTodolistACType |
                          AddTodolistACType |
                          ChangeTodolistTitleACType |
                          ChangeFilterACType |
                          SetTodosType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export type AddTodolistACType = ReturnType<typeof addTodolistAC>

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

type ChangeFilterACType = ReturnType<typeof changeFilterAC>


const initialState: TodolistDomainType[] = [
    // {id: todolistID1, title: 'What to learn', filter: 'all'},
    // {id: todolistID2, title: 'What to buy', filter: 'all'},
]


export const todolistsReducer = (state = initialState, action: ActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistDomainType = {
                id: action.todolistId,
                title: action.payload.title,
                filter: 'all',
                addedDate: new Date().toISOString(),
                order: 0}

            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }
        // case "SET-TODOS":
        //     const copyState = {...state}
        //     action.todos.forEach(el => {
        //         copyState[el.id] = []
        //     })
        //     return copyState
        default:
            return state
    }
}


// creation actions create

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {title},
        todolistId: v1()
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    payload: {todolistId, title}
} as const)


export const changeFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistId, filter}
} as const)

type SetTodosType = ReturnType<typeof setTodosAC>

export const setTodosAC = (todos: TodolistType[]) => ({type: "SET-TODOS", todos} as const)