import axios, {AxiosResponse} from "axios"

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '8d7dd298-66ec-4f05-8fdc-71df822ec232',
    },
})

// api
export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>('/todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`/todo-lists/${todolistId}`, {title})
    }
}

// types
export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: [],
    data: D,
    fieldsErrors: string[],
}



