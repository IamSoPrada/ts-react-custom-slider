import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cn from 'classnames'
import styles from './Gallery.module.css'

interface IImage {
	imgSource?: string
	id?: string
	url?: string
}

interface IImageProps extends IImage {
	isActive?: boolean
}

interface ImagesContainerProps {
	children?: React.ReactNode
}

interface ButtonProps {
	left?: boolean
	right?: boolean
	onClick?: () => void
}
interface GalleryProps {
	setLengthForProgressBar: (length: number) => void
	setActiveImageIdxForProgressBar: (idx: number) => void
}

const Image: React.FC = ({ imgSource, isActive }: IImageProps) => {
	const imageClass = cn(styles.image, {
		[styles.active]: isActive,
	})
	return <img className={imageClass} src={imgSource} />
}

export const Gallery: React.FC<GalleryProps> = ({
	setLengthForProgressBar,
	setActiveImageIdxForProgressBar,
}) => {
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

	const Button: React.FC<ButtonProps> = ({ left, right, onClick }) => {
		const btnClass = cn(styles.btn, {
			[styles.btnRight]: right,
			[styles.btnLeft]: left,
		})
		return (
			<>
				<button className={btnClass} onClick={onClick}>
					{left ? '<' : right ? '>' : ''}
				</button>
			</>
		)
	}

	const ImagesContainer: React.FC<ImagesContainerProps> = ({ children }) => (
		<div className={styles.images__container}>{children}</div>
	)

	const getData = async (): Promise<IImage[]> => {
		const { data } = await axios.get(
			'https://jsonplaceholder.typicode.com/photos'
		)
		const firstTen = data.slice(0, 6)
		localStorage.setItem('images', JSON.stringify(firstTen))
		setImages(firstTen)
		setActiveImageIdxForProgressBar(activeImageIdx + 1)
		return firstTen
	}

	const handleClickNextImage = () => {
		if (activeImageIdx < LAST_IMAGE_IDX) {
			setActiveImageIdx(prev => (prev += 1))
			setActiveImageIdxForProgressBar(activeImageIdx)
		}
	}
	const handleClickPrevImage = () => {
		if (activeImageIdx > 0) {
			setActiveImageIdx(prev => (prev -= 1))
			setActiveImageIdxForProgressBar(activeImageIdx)
		}
	}

	useEffect(() => {
		const imagesFromLS = JSON.parse(localStorage.getItem('images') || '')
		if (Array.isArray(imagesFromLS) && imagesFromLS.length > 0) {
			setImages(imagesFromLS)
			setLengthForProgressBar(imagesFromLS.length)
			setActiveImageIdxForProgressBar(activeImageIdx)
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
			<ImagesContainer></ImagesContainer>
			<Button right onClick={handleClickNextImage} />
		</div>
	)
}
