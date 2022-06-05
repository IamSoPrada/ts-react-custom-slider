import React from "react";
import cn from "classnames";
import styles from "../modules/Gallery.module.css";

interface ButtonProps {
    left?: boolean
    right?: boolean
    onClick?: () => void
}

export const SliderButton: React.FC<ButtonProps> = ({ left, right, onClick }) => {
    const btnClass = cn(styles.btn, {
        [styles.btnRight]: right,
        [styles.btnLeft]: left,
    })
    return (
            <button className={btnClass} onClick={onClick}>
                {left ? '<' : right ? '>' : ''}
            </button>
    )
}