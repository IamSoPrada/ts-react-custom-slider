import styles from "./SliderTitle.module.css"

interface SliderTitleProps {
  children: React.ReactNode
}
export const SliderTitle = ({children}: SliderTitleProps) => {
  return <h3 className={styles.title}>{children}</h3>
}