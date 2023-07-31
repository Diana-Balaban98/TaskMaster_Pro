import {instance} from "./todolists-api";
import {ResponseType} from "./todolists-api";

export type TaskType = {
    id: string
    title: string
    description: string,
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string,
    deadline: string,
    addedDate: string
}

type ResponseTaskType = {
    items: TaskType[],
    totalCount: number
    error: null
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<ResponseTaskType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}