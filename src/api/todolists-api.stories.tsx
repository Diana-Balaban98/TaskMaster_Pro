import React, {useEffect, useState} from 'react'
import {todolistsApi} from "./todolists-api";


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsApi.getTodo()
            .then(response => setState(response))
            .catch(e => console.log(e))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = "IT-INCUBATOR";
        todolistsApi.addTodo(title)
            .then(response => setState(response.data))
            .catch(e => console.log(e))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '1173a381-719d-4d14-87d3-86e2d27e4e22';

    todolistsApi.deleteTodo(todolistId)
        .then(response => setState(response.data))
        .catch(e => console.log(e))
    useEffect(() => {
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = "JS";
        const todolistId = 'd1600ecc-b04d-4e7a-a9c4-c5c5686b0934';

        todolistsApi.updateTodo(todolistId, title)
            .then(response => setState(response.data))
            .catch(e => console.log(e))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

