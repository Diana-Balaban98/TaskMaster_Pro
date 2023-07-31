import React, {useEffect, useState} from 'react'
import {todolistsApi} from "./todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then(res => setState(res.data))
            .catch(err => console.log(err));
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState("")

    const createTodolist = () => {
        todolistsApi.createTodolist(title)
            .then(res => setState(res.data))
            .catch(err => console.log(err))
    }

    return <div>
        <h2>Создание тудулиста:</h2>
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="Название тудулиста..."/>
        <button onClick={createTodolist}>Создать</button>
        <div>Результат: {JSON.stringify(state)}</div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")

    const deleteTodolist = () => {
        todolistsApi.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return <div>
        <h2>Удаление тудулиста:</h2>
        <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}
               placeholder="Введите todolistId"/>
        <button onClick={deleteTodolist}>Удалить</button>
        <div>Результат: {JSON.stringify(state)}</div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [title, setTitle] = useState("")

    const updateTodolist = () => {
        todolistsApi.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
            .catch(err => console.log(err))
    }


    return <div>
        <h2>Обновление тудулиста:</h2>
        <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}
               placeholder="Введите todolistId"/>
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="Название тудулиста..."/>
        <button onClick={updateTodolist}>Изменить название тудулиста</button>
        <div>Результат: {JSON.stringify(state)}</div>
    </div>
}


