import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (title: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    let [newTask, setNewTask] = useState<string>("")

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.currentTarget.value)
    }

    const removeHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    const onClickHandler = () => {
        props.addTasks(newTask)
        setNewTask("")
    }

    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key  === "Enter") {
                onClickHandler()
            }
    }

    const removeTaskHandler = (tID: string) => {
            props.removeTask(tID)
    }

    const mappedTasks = props.tasks.map((task, index) => {
        return <li style={{display: "flex"}} key={index}>
            <Button name={"X"} callBack={() => removeTaskHandler(task.id)}/>
            <input value={newTask} type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
        </li>
    })


    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div style={{display: "flex"}}>
                <input style={{marginRight: "5px"}} value={newTask} onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}/>
                <Button name={"+"} callBack={onClickHandler}/>
            </div>
            <ul>
                {
                    mappedTasks
                }
            </ul>
            <div>
                <button onClick={() => removeHandler("all")}>All</button>
                <button onClick={() => removeHandler("active")}>Active</button>
                <button onClick={() => removeHandler("completed")}>Completed</button>
            </div>
        </div>
    )
}

