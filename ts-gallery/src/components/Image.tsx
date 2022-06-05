import React from "react";
import cn from "classnames";
import styles from "../modules/Gallery.module.css";

export interface IImage {
    imgSource?: string
    id?: string
    url?: string
}

interface IImageProps extends IImage {
    isActive?: boolean
}

export const Image: React.FC<IImageProps> = ({ imgSource, isActive }) => {
    const imageClass = cn(styles.image, {
        [styles.active]: isActive,
    })
    return <img alt="photo" className={imageClass} src={imgSource} />
}