import React from 'react';
import s from "../TodoList/Todolist.module.css";
import {SuperCheckbox} from "../SuperCheckbox/SuperCheckbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import ClearIcon from "@mui/icons-material/Clear";
import {TaskStatuses, TaskType} from "../../api/tasks-api";


type TaskPropsType = {
    task: TaskType
    changeStatus: (taskId: string, status: TaskStatuses) => void
    removeTask: (taskId: string) => void
    updateTask: (taskId: string, updateTitle: string) => void
}


export const Task = React.memo(({task, updateTask, removeTask, changeStatus}: TaskPropsType) => {

    const removeTaskHandler = () => {
        removeTask(task.id)
    }

    const updateTitleHandler = (updateTitle: string) => {
        return updateTask(task.id, updateTitle)
    }

    const changeStatusTask = (checked: boolean) => changeStatus(task.id, checked ? TaskStatuses.Completed : TaskStatuses.New)

    return <li className={`${s.task} ${task.status ? s.isDone : ""}`}>
        <SuperCheckbox callBack={changeStatusTask} checked={!!task.status}/>
        <EditableSpan oldTitle={task.title}
                      callBack={updateTitleHandler}/>
        <ClearIcon color="action" onClick={removeTaskHandler}/>
    </li>
});