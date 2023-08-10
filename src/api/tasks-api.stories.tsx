import {useState} from "react";
import {tasksApi} from "./tasks-api";

export default {
    title: 'API-TASKS'
}

export const GetTasks = () => {
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")

    const getAllTasks = () => {
        tasksApi.getTasks(todolistId)
            .then(res => setTasks(res.data))
            .catch(err => console.log(err))
    }

    return <div>
        <h2>Получить таски для тудулиста:</h2>
        <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}
               placeholder="Введите todolistId"/>
        <button onClick={getAllTasks}>Получить таски</button>
        <div>Результат: {JSON.stringify(tasks)}</div>
    </div>
}

export const CreateTask = () => {
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [title, setTitle] = useState("")

    const createTask = () => {
        tasksApi.createTask(todolistId, title)
            .then(res => setTasks(res.data))
            .catch(err => console.log(err))
    }

    return <div>
        <h2>Создать таски для тудулиста:</h2>
        <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}
               placeholder="Введите todolistId"/>
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="Название таски..."/>
        <button onClick={createTask}>Создать таску</button>
        <div>Результат: {JSON.stringify(tasks)}</div>
    </div>
}

export const UpdateTask = () => {
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [taskId, setTaskId] = useState("")
    const [title, setTitle] = useState("")

    const updateTask = () => {
        tasksApi.updateTask(todolistId, taskId, {title: "", status: 1, deadline: "", description: "", priority: 0, startDate: ""})
            .then(res => setTasks(res.data))
            .catch(err => console.log(err))
    }

    return <div>
        <h2>Обновить таску для тудулиста:</h2>
        <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}
               placeholder="Введите todolistId"/>
        <input value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} placeholder="Введите taskId"/>
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="Название таски..."/>
        <button onClick={updateTask}>Изменить название таски</button>
        <div>Результат: {JSON.stringify(tasks)}</div>
    </div>
}

export const DeleteTask = () => {
    const [tasks, setTasks] = useState<any>(null)
    const [todolistId, setTodolistId] = useState("")
    const [taskId, setTaskId] = useState("")

    const deleteTask = () => {
        tasksApi.deleteTask(todolistId, taskId)
            .then(res => setTasks(res.data))
            .catch(err => console.log(err))
    }

    return <div>
        <h2>Удалить таску для тудулиста:</h2>
        <input value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}
               placeholder="Введите todolistId"/>
        <input value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} placeholder="Введите taskId"/>
        <button onClick={deleteTask}>Удалить таску</button>
        <div>Результат: {JSON.stringify(tasks)}</div>
    </div>
}

