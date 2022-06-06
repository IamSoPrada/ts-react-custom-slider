import React from "react";
import cn from "classnames"

import styles from "../modules/Gallery.module.css";

interface ImagesContainerProps {
    children?: React.ReactNode
}

export const ImagesContainer: React.FC<ImagesContainerProps> = ({ children }) => {
    const imgsContainerClass = cn(styles.images__container, {
        [styles.dColumn]: true
    })
    return <div className={imgsContainerClass}>{children}</div>
}