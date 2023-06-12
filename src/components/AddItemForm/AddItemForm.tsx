import React, {ChangeEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import {SuperButton} from "../SuperButton/SuperButton";


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
            <div style={{display: "flex"}}>
                <TextField
                    error={!!error}
                    value={newTask}
                    id="outlined-basic"
                    label={error ? "Title is required" : "Please type smth..."}
                    variant="outlined"
                    size='small'
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <SuperButton name="+" callBack={onClickHandler} variant="contained" color="primary"/>
            </div>
    );
};

