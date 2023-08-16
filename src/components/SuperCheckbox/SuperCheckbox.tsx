import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {blue} from "@mui/material/colors";

type PropsType = {
    checked: boolean
    callBack: (checked: boolean) => void
}

export const SuperCheckbox = ({callBack, checked}: PropsType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }

    return (
        <Checkbox  sx={{
            color: blue[600],
            '&.Mui-checked': {
                color: blue[600],
            }}} onChange={onChangeHandler} checked={checked} size="small"/>
    );
};

