import React, { useState, useEffect } from 'react'
import {Button} from "../components/Button"
import {ImagesContainer} from '../components/ImagesContainer'
import {Image} from "../components/Image"
import axios from 'axios'
import type {IImage} from '../components/Image'
import styles from './Gallery.module.css'


interface GalleryProps {
	children?: React.ReactNode
}

export const Gallery: React.FC<GalleryProps> = () => {
	const [images, setImages] = useState<IImage[] | null>(null)

	const LAST_IMAGE_IDX =
		Array.isArray(images) && images.length > 0 && images.length - 1

	const [activeImageIdx, setActiveImageIdx] = useState<number>(1)

	const renderImages = (images: IImage[]) =>
		images.map((image: IImage, idx: number) => (
			<Image
				key={image.id}
				isActive={idx === activeImageIdx}
				imgSource={image.url}
			/>
		))

	const getData = async (): Promise<IImage[]> => {
		const { data } = await axios.get(
			'https://jsonplaceholder.typicode.com/photos'
		)
		const firstTen = data.slice(0, 11)
		localStorage.setItem('images', JSON.stringify(firstTen))
		setImages(firstTen)

		return firstTen
	}

	const handleClickNextImage = () => {
		if (activeImageIdx < LAST_IMAGE_IDX) {
			setActiveImageIdx(prev => (prev += 1))

		}
	}
	const handleClickPrevImage = () => {
		if (activeImageIdx > 0) {
			setActiveImageIdx(prev => (prev -= 1))
		}
	}

	useEffect(() => {
		const imagesFromLS = JSON.parse(localStorage.getItem('images') || JSON.stringify(''))
		if (Array.isArray(imagesFromLS) && imagesFromLS.length > 0) {
			setImages(imagesFromLS)
		} else {
			getData()
		}
	}, [])

	return (
		<div className={styles.gallery}>
			<Button left onClick={handleClickPrevImage} />
			<ImagesContainer>
				{Array.isArray(images) && images.length > 0 && renderImages(images)}
			</ImagesContainer>
			<Button right onClick={handleClickNextImage} />
		</div>
	)
}
