import React, { ReactNode } from 'react'
import style from './title.module.scss'

type TitleTypes = {
    text: string | ReactNode;
}

export const Title = (props:TitleTypes) => {
    return (
        <header className={style.title}>
            {props.text}
        </header>
    )
}
