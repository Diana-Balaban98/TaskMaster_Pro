import React, {ChangeEvent, useState} from 'react';
import s from "../TodoList/Todolist.module.css";
import {Button} from '@mui/material'
import TextField from '@mui/material/TextField';


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

    const buttonStyles={
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
    }

    return (
        <div>
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
                {/*<input className={error ? s.error : ""} style={{marginRight: "5px"}} value={newTask}*/}
                {/*       onChange={onChangeInputHandler} onKeyPress={onKeyPressHandler}/>*/}
                {/*<SuperButton name={"+"} callBack={onClickHandler}/>*/}
                <Button style={buttonStyles} onClick={onClickHandler} variant="contained">+</Button>
            </div>
        </div>
    );
};

