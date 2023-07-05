import React, {useCallback, useState} from "react";
import {FilterValuesType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {SuperButton} from "../SuperButton/SuperButton";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../Task/Task";


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

export const Todolist = React.memo(({
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

    const onclickFilterHandler = useCallback((filter: FilterValuesType) => {
        restProps.changeFilter(todolistId, filter)
        setButtonName(filter);
    }, [])

    const removeTaskHandler = (taskId: string) => {
        removeTask(todolistId, taskId)
    };

    const changeStatusHandler = (taskId: string, checkedValue: boolean) => {
        restProps.changeStatus(todolistId, taskId, checkedValue);
    }

    const updateTaskHandler = (taskId: string, updateTitle: string) => {
        updateTask(todolistId, taskId, updateTitle)
    }

    let allTasks = tasks;

    if (restProps.filter === "completed") {
        allTasks = tasks.filter(t => t.isDone);
    }

    if (restProps.filter === "active") {
        allTasks = tasks.filter(t => !t.isDone);
    }


    const mappedTasks = allTasks.map((task, index) => {
        return <Task task={task} changeStatus={changeStatusHandler} removeTask={removeTaskHandler}
                     updateTask={updateTaskHandler}/>
    })


    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    }

    const addTaskHandler = useCallback((title: string) => {
        addTasks(todolistId, title);
    }, [])


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
                             callBack={() => onclickFilterHandler("all")}/>
                <SuperButton name="Active" variant={buttonName === 'active' ? "outlined" : "contained"} color='error'
                             callBack={() => onclickFilterHandler("active")}/>
                <SuperButton name="Completed" variant={buttonName === 'completed' ? "outlined" : "contained"}
                             color='success' callBack={() => onclickFilterHandler("completed")}/>
            </div>
        </div>
    )
})


