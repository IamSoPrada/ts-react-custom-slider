import React from "react";
import styles from "../modules/Gallery.module.css";

interface ImagesContainerProps {
    children?: React.ReactNode
}

export const ImagesContainer: React.FC<ImagesContainerProps> = ({ children }) => (
    <div className={styles.images__container}>{children}</div>
)