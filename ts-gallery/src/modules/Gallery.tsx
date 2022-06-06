import React, { useState, useEffect } from 'react'
import {SliderButton} from "../components/SliderButton"
import {ImagesContainer} from '../components/ImagesContainer'
import {Image} from "../components/Image"
import {Quote} from "../components/Quote";
import axios from 'axios'
import type {IImage} from '../components/Image'
import type {IQuote} from '../components/Quote'
import styles from './Gallery.module.css'


interface GalleryProps {
	children?: React.ReactNode
}

export const Gallery = () => {
	const [images, setImages] = useState<IImage[] | null>(null)
	const [quotes, setQuotes] = useState<IImage[] | null>(null)

	const LAST_IMAGE_IDX =
		Array.isArray(images) && images.length > 0 && images.length - 1

	const [activeImageIdx, setActiveImageIdx] = useState<number>(0)

	const renderImages = () =>
		Array.isArray(images) && images.map((image: IImage, idx: number) => (
			<Image
				key={image.id}
				isActive={idx === activeImageIdx}
				imgSource={image.download_url}
			/>
		))

	const renderQuotes = () =>
		Array.isArray(quotes) && quotes.map((quote: IQuote, idx: number) => (
			<Quote key={quote.id} author={quote.author} text={quote.text} isActive={idx === activeImageIdx}/>
		))

	const getImages = async (): Promise<IImage[]> => {
		try{
			const { data } = await axios.get(
				'https://picsum.photos/v2/list?page=2&limit=10'
			)
			const firstTen = data.slice(0, 11)
			localStorage.setItem('images', JSON.stringify(firstTen))
			setImages(firstTen)
			return firstTen
		} catch(e) {
			throw new Error("Error :", JSON.parse(JSON.stringify(e)))
		}
	}

	const getQuotes = async (): Promise<IImage[]> => {
		try{
			const options = {
				method: 'GET',
				url: 'https://famous-quotes4.p.rapidapi.com/random',
				params: {category: 'computers', count: '11'},
				headers: {
					'X-RapidAPI-Host': import.meta.env.VITE_QUOTES_API_URL,
					'X-RapidAPI-Key': import.meta.env.VITE_QUOTES_API_ANON_KEY
				}
			};
			const { data } = await axios.request(options)
			localStorage.setItem('quotes', JSON.stringify(data))
			const newIds = data.map((quote:IQuote, idx: number)=> Object.assign({}, {...quote, id: idx+1}))
			setQuotes(newIds)
			return data
		} catch(e){
			throw new Error("Error :", JSON.parse(JSON.stringify(e)))
		}
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
		const quotesFromLS = JSON.parse(localStorage.getItem('quotes') || JSON.stringify(''))
		if (Array.isArray(imagesFromLS) && imagesFromLS.length > 0 && Array.isArray(quotesFromLS) && quotesFromLS.length > 0) {
			setImages(imagesFromLS)
			setQuotes(quotesFromLS)
		} else {
			getImages()
			getQuotes()
		}
	}, [])

	return (
		<div className={styles.gallery}>
			<SliderButton left onClick={handleClickPrevImage} />
			<ImagesContainer>
				{Array.isArray(images) && images.length > 0 && renderImages()}
			</ImagesContainer>
			<ImagesContainer>
				{Array.isArray(quotes) && quotes.length > 0 && renderQuotes()}
			</ImagesContainer>
			<SliderButton right onClick={handleClickNextImage} />
		</div>
	)
}
