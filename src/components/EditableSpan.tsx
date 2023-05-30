import React, {ChangeEvent, useState} from 'react';


type EditableSpanPropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan = ({oldTitle, callBack}: EditableSpanPropsType) => {
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
                <input onChange={onChangeInputHandler} value={updateTitle} onBlur={editFoo} autoFocus/>
                :
                <span onDoubleClick={editFoo}>{oldTitle}</span>
            }
        </>
    )
}