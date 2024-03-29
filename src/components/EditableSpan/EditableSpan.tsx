import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";


type EditableSpanPropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan = React.memo(({oldTitle, callBack}: EditableSpanPropsType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [updateTitle, setUpdateTitle] = useState<string>(oldTitle)

    const editFoo = () => {
        setEdit(!edit)
        if (edit) {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        callBack(updateTitle)
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(event.currentTarget.value)
    }

    return (
        <>
            {edit ?
                <TextField label="Enter the title..." variant="standard" onChange={onChangeInputHandler} value={updateTitle} onBlur={editFoo} autoFocus/>
                :
                <span onDoubleClick={editFoo}>{oldTitle}</span>
            }
        </>
    )
})
