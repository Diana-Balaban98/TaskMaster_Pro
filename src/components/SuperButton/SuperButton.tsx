import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
    className?: string
}

export const SuperButton = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <div>
            <button onClick={onClickHandler}>{props.name}</button>
        </div>
    );
};

