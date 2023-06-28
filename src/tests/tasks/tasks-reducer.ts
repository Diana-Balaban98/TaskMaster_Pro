import {TaskAssocType} from "../../App";
import {AddTodolistACType, RemoveTodolistACType, todolistID1, todolistID2} from "../todolists/todolists-reducer";
import {v1} from "uuid";


export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistACType
    | RemoveTodolistACType

let initialState: TaskAssocType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
}

export const tasksReducer = (state = initialState, action: ActionsType): TaskAssocType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            debugger
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "CHANGE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST":
            // const copyState = {...state}
            // delete copyState[action.payload.id]
            // return copyState
            const {[action.payload.id]: [], ...rest} = state
            return rest
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK', payload: {taskId, todolistId, isDone}} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TITLE', payload: {taskId, todolistId, title}} as const
}

