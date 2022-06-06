import React from "react";
import cn from "classnames";
import styles from "../modules/Gallery.module.css";
import {SliderTitle} from "./SliderTitle";
import {SliderText} from "./SliderText";

export interface IQuote{
  id?: string
  author?: string
  text?: string
}

interface IQuoteProps extends IQuote {
  isActive?: boolean
}

export const Quote = ({ author,text, isActive } : IQuoteProps) => {
  const quoteClass = cn(styles.quote, {
    [styles.active]: isActive,
  })
  return (
    <div className={quoteClass}>
      <SliderTitle> {author}</SliderTitle>
      <SliderText>{text}</SliderText>
    </div>
  )
}