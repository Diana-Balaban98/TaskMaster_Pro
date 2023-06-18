import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";

type PropsType = {
    checked: boolean
    callBack: (checked: boolean) => void
}


export const SuperCheckbox = ({callBack, checked}: PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }

    return (
        <Checkbox onChange={onChangeHandler} checked={checked}/>
    );
};

