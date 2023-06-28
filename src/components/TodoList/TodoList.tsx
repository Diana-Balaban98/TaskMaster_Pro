import React, {useState} from "react";
import {FilterValuesType} from "../../App";
import s from "./Todolist.module.css"
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {SuperButton} from "../SuperButton/SuperButton";
import ClearIcon from '@mui/icons-material/Clear';
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {SuperCheckbox} from "../SuperCheckbox/SuperCheckbox";


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

    const removeTaskHandler = (ID: string) => () => removeTask(todolistId, ID);

    const changeStatusHandler = (checked: boolean, id: string) => {
        restProps.changeStatus(todolistId, id, checked);
    }

    const mappedTasks = tasks.map((task, index) => {

        return <li className={`${s.task} ${task.isDone ? s.isDone : ""}`} key={index}>
            <SuperCheckbox callBack={(checked: boolean) => changeStatusHandler(checked, task.id)} checked={task.isDone}/>
            <EditableSpan oldTitle={task.title}
                          callBack={(updateTitle: string) => updateTaskHandler(task.id, updateTitle)}/>
            <ClearIcon color="action" onClick={removeTaskHandler(task.id)}/>
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
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
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
                <SuperButton name="All" variant={buttonName === 'all' ? "outlined" : "contained"} color="primary"
                             callBack={() => removeHandler("all")}/>
                <SuperButton name="Active" variant={buttonName === 'active' ? "outlined" : "contained"} color='error'
                             callBack={() => removeHandler("active")}/>
                <SuperButton name="Completed" variant={buttonName === 'completed' ? "outlined" : "contained"}
                             color='success' callBack={() => removeHandler("completed")}/>
            </div>
        </div>
    )
}

