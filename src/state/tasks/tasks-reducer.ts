import {TaskAssocType} from "../../AppWithRedux";
import {AddTodolistACType, RemoveTodolistACType, SetTodosType} from "../../state/todolists/todolists-reducer";
import {v1} from "uuid";
import {TaskType} from "../../api/tasks-api";

// types action (objects)
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
    | SetTodosType

let initialState: TaskAssocType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TaskAssocType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {id: v1(), title: action.payload.title, status: 0, addedDate: "", deadline: "", description: "", order: 1, startDate: "", priority: 1, todoListId: action.payload.todolistId}
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
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            // const copyState = {...state}
            // delete copyState[action.payload.id]
            // return copyState
            const {[action.payload.todolistId]: [], ...rest} = state
            return rest
        case "SET-TODOLISTS":
            const copyState = {...state}
            action.todos.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        default:
            return state
    }
}


// creation actions create

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean | number, todolistId: string) => {
    return {type: 'CHANGE-TASK', payload: {taskId, todolistId, isDone}} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TITLE', payload: {taskId, todolistId, title}} as const
}

