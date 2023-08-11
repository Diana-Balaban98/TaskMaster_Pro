import {TaskAssocType} from "../../AppWithRedux";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodosActionType
} from "../../state/todolists/todolists-reducer";
import {tasksApi, TaskType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

// types action (objects)
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type setTasksActionType = ReturnType<typeof setTasksAC>

export type TasksActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosActionType
    | setTasksActionType

let initialState: TaskAssocType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TaskAssocType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        case 'ADD-TASK': {
            const copyState = {...state}
            const tasks = copyState[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            copyState[action.task.todoListId] = newTasks

            return copyState
        }
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
        case "SET-TASKS":
            // {key: []}
            const copyS = {...state};
            copyS[action.taskId] = action.tasks;

            return copyS
        default:
            return state
    }
}


// creation actions create

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}

export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean | number, todolistId: string) => {
    return {type: 'CHANGE-TASK', payload: {taskId, todolistId, isDone}} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TITLE', payload: {taskId, todolistId, title}} as const
}

export const setTasksAC = (tasks: TaskType[], taskId: string) => ({
    type: "SET-TASKS",
    tasks,
    taskId
} as const)


// thunks
export const fetchTasksTC = (todolistId: string): any => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then(res => {
        dispatch(setTasksAC(res.data.items, todolistId))
    })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksApi.createTask(todolistId, title).then(res => {
        dispatch(addTaskAC(res.data.data.item))
    }).catch(e => {
        console.log(e)
    })
}

export const changeStatusTaskTC = (todolistId: string, taskId: string, checked: boolean) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
        return t.id === taskId
    })

    if (task) {
        tasksApi.updateTask(todolistId, taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        }).then(() => {
            const action = changeTaskStatusAC(taskId, checked, todolistId)
            dispatch(action)
        })
    }

}