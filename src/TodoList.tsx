import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import s from "./Todolist.module.css"


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTasks: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, checkedValue: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTask, setNewTask] = useState<string>("")
    const [error, setError] = useState<string | boolean>("")
    const [buttonName, setButtonName] = useState<FilterValuesType>("all")

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTask(event.currentTarget.value)
    }

    const removeHandler = (filter: FilterValuesType) => {
        props.changeFilter(props.todolistId, filter)
        setButtonName(filter)
    }

    const onClickHandler = () => {
        if (newTask.trim() !== "") {
            props.addTasks(props.todolistId, newTask.trim())
            setNewTask("")
        } else {
            setError("Title is required")
        }
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }

    const removeTaskHandler = (ID: string) => {
        props.removeTask(props.todolistId, ID)
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeStatus(props.todolistId, id, e.currentTarget.checked)
    }

    const mappedTasks = props.tasks.map((task, index) => {

        return <li className={task.isDone ? s.isDone : ""} style={{display: "flex"}} key={index}>
            <Button name={"X"} callBack={() => removeTaskHandler(task.id)}/>
            <input value={newTask} type="checkbox" checked={task.isDone}
                   onChange={(e) => changeStatusHandler(e, task.id)}/>
            <span>{task.title}</span>
        </li>
    })

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div className="todolist">
            <h3>
                {props.title}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <div style={{display: "flex"}}>
                <input className={error ? s.error : ""} style={{marginRight: "5px"}} value={newTask}
                       onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}/>
                <Button name={"+"} callBack={onClickHandler}/>
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
            <ul>
                {
                    mappedTasks
                }
            </ul>
            <div>
                <button className={buttonName === "all" ? s.activeFilter : ""}
                        onClick={() => removeHandler("all")}>All
                </button>
                <button className={buttonName === "active" ? s.activeFilter : ""}
                        onClick={() => removeHandler("active")}>Active
                </button>
                <button className={buttonName === "completed" ? s.activeFilter : ""}
                        onClick={() => removeHandler("completed")}>Completed
                </button>
            </div>
        </div>
    )
}

