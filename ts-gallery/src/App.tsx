import { useState } from 'react'
import { Gallery } from './Gallery'
import styles from './App.module.css'

const App = () => {
	const [length, setLength] = useState(0)
	const [activeImageIdx, setActiveImageIdx] = useState(0)
	return (
		<div className={styles.container}>
			<Gallery
				setLengthForProgressBar={(length: number) => setLength(length)}
				setActiveImageIdxForProgressBar={(idx: number) =>
					setActiveImageIdx(idx)
				}
			/>
		</div>
	)
}

export default App
