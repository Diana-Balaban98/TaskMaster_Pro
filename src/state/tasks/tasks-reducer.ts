import {TaskAssocType} from "../../app/AppWithRedux";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodosActionType
} from "../../state/todolists/todolists-reducer";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType, AppThunk} from "../store";

// types action (objects)
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type setTasksActionType = ReturnType<typeof setTasksAC>

// types for action
export type TasksActionsType =
    | RemoveTaskActionType
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
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "CHANGE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t, status: action.payload.status
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
            return {...state, [action.payload.todolist.id]: []}
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
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}


// create object-action
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: number, todolistId: string) => ({type: 'CHANGE-TASK', payload: {taskId, todolistId, status}} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TITLE', payload: {taskId, todolistId, title}} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: "SET-TASKS", tasks, todolistId} as const)


// thunks
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId).then(res => {
        dispatch(setTasksAC(res.data.items, todolistId))
    })
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch: Dispatch) => {
    tasksApi.deleteTask(todolistId, taskId).then(res => {
        dispatch(removeTaskAC(taskId, todolistId))
    })
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch: Dispatch) => {
    tasksApi.createTask(todolistId, title).then(res => {
        dispatch(addTaskAC(res.data.data.item))
    }).catch(e => {
        console.log(e)
    })
}

export const changeStatusTaskTC = (todolistId: string, taskId: string, status: TaskStatuses): AppThunk =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find(t => t.id === taskId)

    if (task) {
        tasksApi.updateTask(todolistId, taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status,
        }).then(() => {
            const action = changeTaskStatusAC(taskId, status, todolistId)
            dispatch(action)
        })
    }
}

export const updateTitleTaskTC = (todolistId: string, taskId: string,title: string): AppThunk =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
            tasksApi.updateTask(todolistId, taskId, {
                title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }).then(() => {
                const action = changeTaskTitleAC(taskId, title, todolistId)
                dispatch(action)
            })
        }
    }

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

// export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
//     const task = getState().tasks[todolistId].find(t => t.id === taskId)
//
//     if (task) {
//         tasksApi.updateTask(todolistId, taskId, {
//             title: task.title,
//             startDate: task.startDate,
//             priority: task.priority,
//             description: task.description,
//             deadline: task.deadline,
//             status: task.status
//         }).then(() => {
//             const action = changeTaskStatusAC(taskId, status, todolistId)
//             dispatch(action)
//         })
//     }
//
// }