import { useState } from 'react'
import { Gallery } from './modules/Gallery'
import styles from './App.module.css'

const App = () => {

	return (
		<div className={styles.container}>
			<Gallery/>
		</div>
	)
}

export default App
