import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../../api/todolists-api";
import {AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "../store";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

// types actions (objects)
export type TodolistsActionTypes = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleACType |
    ChangeFilterACType |
    SetTodosActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

type ChangeFilterACType = ReturnType<typeof changeFilterAC>

export type SetTodosActionType = ReturnType<typeof setTodolistsAC>

const initialState: TodolistDomainType[] = []


export const todolistsReducer = (state = initialState, action: TodolistsActionTypes): TodolistDomainType[] => {
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
                order: 0
            }

            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }
        case "SET-TODOLISTS": {
            return action.todos.map(tl => ({...tl, filter: "all"}))
        }
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

export const setTodolistsAC = (todos: TodolistType[]) => ({
    type: "SET-TODOLISTS",
    todos
} as const)


// thunks
// thunk creator
export const fetchTodolistsTC = ():AppThunk => {
    // thunk
    return (dispatch: Dispatch) => {
        todolistsApi.getTodolists().then(res => {
            dispatch(setTodolistsAC(res.data))
        })
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    todolistsApi.deleteTodolist(todolistId).then(res => {
        dispatch(removeTodolistAC(todolistId))
    })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(title).then(res => {
        dispatch(addTodolistAC(res.data.data.item.title))
    }).catch(e => {
        console.log(e)
    })
}

// приоритетный способ написания санки
// export const _fetchTodolistsTC = (): AppThunk => async dispatch => {
//     try {
//         const res = await todolistsApi.getTodolists();
//         dispatch(setTodolistsAC(res.data))
//     } catch (e) {
//         console.log(e)
//     }
// }
//
//
// type ReturnType = void
//
type AppThunk = ThunkAction<void, AppRootStateType, unknown, AnyAction>

