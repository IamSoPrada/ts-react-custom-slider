import React, { useState, useEffect } from 'react'
import styles from './ProgressBar.module.css'
import cn from 'classnames'
interface ProgressBarProps {
	activeImageIdx: number
	length: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
	activeImageIdx,
	length,
}) => {
	const [maxWidth, setMaxWidth] = useState(0)
	const maxWidthForProgressBar = (activeImageIdx: number) =>
		(600 / length) * activeImageIdx

	const progressBarClass = cn(styles.progress_bar, {})
	useEffect(() => {
		const calculatedMaxWidth = maxWidthForProgressBar(activeImageIdx)

		setMaxWidth(calculatedMaxWidth)
	}, [activeImageIdx])
	return (
		<div className={progressBarClass} style={{ width: `${maxWidth}px` }}></div>
	)
}
