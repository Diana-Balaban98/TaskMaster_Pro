import React, {ChangeEvent, useState} from 'react';
import s from "../Todolist.module.css";
import {Button} from "./Button";


type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTask, setNewTask] = useState<string>("")
    const [error, setError] = useState<string | boolean>("")


    const onClickHandler = () => {
        if (newTask.trim() !== "") {
            props.callBack(newTask.trim())
            setNewTask("")
        } else {
            setError("Title is required")
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTask(event.currentTarget.value)
    }


    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickHandler()
        }
    }


    return (
        <div>
            <div style={{display: "flex"}}>
                <input className={error ? s.error : ""} style={{marginRight: "5px"}} value={newTask}
                       onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}/>
                <Button name={"+"} callBack={onClickHandler}/>
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};

