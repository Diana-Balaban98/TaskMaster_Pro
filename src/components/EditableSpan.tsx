import React, {ChangeEvent, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type EditableSpanPropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan = ({oldTitle, callBack}: EditableSpanPropsType) => {
    const [edit, setEdit] = useState<boolean>(false)

    const editFoo = () => {
        setEdit(!edit)
    }

    const [updateTitle, setUpdateTitle] = useState<string>(oldTitle)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        callBack(updateTitle)
    }

    return (
        <>
            {edit ?
                <input onChange={onChangeInputHandler} value={updateTitle} onBlur={editFoo} autoFocus/>
                :
                <span onDoubleClick={editFoo} onClick={addTaskHandler}>{oldTitle}</span>
            }
        </>
    )
}