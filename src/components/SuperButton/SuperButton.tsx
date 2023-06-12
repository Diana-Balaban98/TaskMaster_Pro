import React from 'react';
import {Button} from "@mui/material";

type ColorForButton = "inherit" | "primary" | "secondary" | "success" | "error" | "info" |"warning"

type ButtonPropsType = {
    name: string
    variant?: "text" | "outlined" | "contained"
    color?: ColorForButton
    callBack: () => void
}

export const SuperButton: React.FC<ButtonPropsType> = ({
    name, variant, color, callBack
                                                       }) => {

    const onClickHandler = () => {
        callBack()
    }

    return (
        <div>
            <Button style={{marginLeft: '7px'}} color={color} variant={variant} onClick={onClickHandler}>{name}</Button>
        </div>
    );
};

