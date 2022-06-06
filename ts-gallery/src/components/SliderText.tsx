import styles from "./SliderText.module.css"
interface SliderTextProps {
  children: React.ReactNode
}

export const SliderText = ({children}: SliderTextProps) => {
  return <p className={styles.text}>{children}</p>
}