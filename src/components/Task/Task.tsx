import React from 'react';
import s from "../TodoList/Todolist.module.css";
import {SuperCheckbox} from "../SuperCheckbox/SuperCheckbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import ClearIcon from "@mui/icons-material/Clear";
import {TaskType} from "../TodoList/TodoList";

type TaskPropsType = {
    task: TaskType
    changeStatus: (taskId: string, checkedValue: boolean) => void
    removeTask: (taskId: string) => void
    updateTask: (taskId: string, updateTitle: string) => void
}


export const Task = React.memo(({task, updateTask, removeTask, changeStatus}: TaskPropsType) => {
    return <li className={`${s.task} ${task.isDone ? s.isDone : ""}`}>
        <SuperCheckbox callBack={(checked: boolean) => changeStatus(task.id, checked)} checked={task.isDone}/>
        <EditableSpan oldTitle={task.title}
                      callBack={(updateTitle: string) => updateTask(task.id, updateTitle)}/>
        <ClearIcon color="action" onClick={() => removeTask(task.id)}/>
    </li>
});