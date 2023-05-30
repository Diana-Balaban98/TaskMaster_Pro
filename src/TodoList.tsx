import React, {ChangeEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import s from "./Todolist.module.css"
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


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
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolist: (todolistId: string, updateTitle: string) => void
}

export const Todolist = ({
                             todolistId,
                             title,
                             updateTodolist,
                             removeTodolist,
                             removeTask,
                             updateTask,
                             tasks,
                             addTasks,
                             ...restProps
                         }: TodolistPropsType) => {
    const [buttonName, setButtonName] = useState<FilterValuesType>("all");

    const removeHandler = (filter: FilterValuesType) => {
        restProps.changeFilter(todolistId, filter)
        setButtonName(filter);
    }

    const removeTaskHandler = (ID: string) => {
        removeTask(todolistId, ID);
    }

    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        restProps.changeStatus(todolistId, id, e.currentTarget.checked);
    }

    const mappedTasks = tasks.map((task, index) => {

        return <li className={task.isDone ? s.isDone : ""} style={{display: "flex"}} key={index}>
            <Button name={"X"} callBack={() => removeTaskHandler(task.id)}/>
            <input type="checkbox" checked={task.isDone}
                   onChange={(e) => changeStatusHandler(e, task.id)}/>
            {/*<span>{task.title}</span>*/}
            <EditableSpan oldTitle={task.title}
                          callBack={(updateTitle: string) => updateTaskHandler(task.id, updateTitle)}/>
        </li>
    })

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    }

    const addTaskHandler = (title: string) => {
        addTasks(todolistId, title);
    }


    const updateTaskHandler = (taskId: string, updateTitle: string) => {
        updateTask(todolistId, taskId, updateTitle)
    }

    const updateTodolistHandler = (updateTitle: string) => {
        updateTodolist(todolistId, updateTitle);
    }


    return (
        <div className="todolist">
            <button onClick={removeTodolistHandler}>X</button>
            <h3>
                <EditableSpan oldTitle={title} callBack={updateTodolistHandler}/>
            </h3>
            <div style={{display: "flex"}}>
                <AddItemForm callBack={addTaskHandler}/>
            </div>
            <ul>
                {
                    mappedTasks
                }
            </ul>
            <div style={{display: "flex"}}>
                <Button className={buttonName === "all" ? s.activeFilter : ""} name="All"
                        callBack={() => removeHandler("all")}/>
                <Button className={buttonName === "active" ? s.activeFilter : ""} name="Active"
                        callBack={() => removeHandler("active")}/>
                <Button className={buttonName === "completed" ? s.activeFilter : ""} name="Completed"
                        callBack={() => removeHandler("completed")}/>
            </div>
        </div>
    )
}

