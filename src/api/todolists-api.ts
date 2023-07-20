import axios from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': 'ba1d0483-01e2-4f69-9a1d-77b289fa1d32',
    },
})

export const todolistsApi = {
    getTodo() {
        return instance.get<TodolistType[]>("todo-lists");
    },
    addTodo(title: string) {
        return instance.post<CreateResponseType<{item: TodolistType}>>("todo-lists", {title});
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CreateResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string) {
        return instance.put<CreateResponseType>(`todo-lists/${todolistId}`, {title})
    }
}

export type TodolistType = {
    addedDate: string
    id: string
    order: string
    title: string
}

export type CreateResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}
