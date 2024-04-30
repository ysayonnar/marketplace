import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from './Header'
import ratingImage from '../static/star.png'
import ReviewCard from './ReviewCard'
import MyButton from '../UI/MyButton/MyButton'
import MyInput from '../UI/MyInput/MyInput'

function SinglePage() {
	const [product, setProduct] = useState({})
	const [reviews, setReviews] = useState([])
	const { id } = useParams()
	const [path, setPath] = useState('')
	const [loaded, setLoaded] = useState(false)
	
	const [file, setFile] = useState()
	const [drag, setDrag] = useState(false)
	const [title, setTitle] = useState('')
	const [rating, setRating] = useState(5)
	const [submitted, setSubmitted] = useState(false)

	const handleSumbit = async e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('image', file)
		formData.append('title', title)
		formData.append('content', 'no')
		formData.append('rating', rating)
		formData.append('productId', id)

		const response = await axios.post(
			'http://localhost:3000/api/review/create',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					'authorization': localStorage.getItem('authorization'),
				},
			}
		)
		setSubmitted(true)
	}

	const dragStartHandler = e => {
		e.preventDefault()
		setDrag(true)
	}

	const dragLeaveHandler = e => {
		e.preventDefault()
		setDrag(false)
	}

	const onDragHandler = async(e) => {
		e.preventDefault()
		setFile(e.dataTransfer.files[0]) 
		setDrag(false)
	} 

	const handleRatingSet = (rate,e) => {
		e.preventDefault(e)
		setRating(rate)
	}

	useEffect(() => {
		window.scrollTo(0, 0)
		const getInfo = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/api/product/one/${id}`
				)
				setProduct(response.data.product)
				setPath(`http://localhost:3000/${response.data.product.image_url}`)
			} catch (error) {
				console.log(error)
				setProduct({})
			}
			try {
				const response = await axios.get(
					`http://localhost:3000/api/review/all/${id}`
				)
				if(!response.data.reviews){
					return console.log('error');
				}
				setReviews(response.data.reviews)
			} catch (error) {
				console.log(error);
			}
			setLoaded(true)
		}

		getInfo()
	}, [])

	return (
		<div className='display'>
			<div className='header_wraper'>
				<Header nosearch={true} />
			</div>
			<div className='singlePage'>
				<div className='singlePage_content'>
					{loaded && <img className='singlePage_image' src={path} alt='' />}
					<div className='singlePageInfo'>
						<h2 className='singlePageTitle'>{product.title}</h2>
						<h1 className='ratingString'>
							<img
								style={{ width: '26px', height: '26px', marginRight: '10px' }}
								src={ratingImage}
								alt=''
							/>
							Rating:{' '}
							{product.rating ? product.rating.toFixed(2) : 'No reviews'}
						</h1>
						<p className='singlePageDescription'>{product.description}</p>
						<h1 className='singlePagePrice'>{product.price} BYN</h1>
						<h3 className='singlePageOldPrice'>
							{Math.floor(product.price * 1.25)} BYN
						</h3>
					</div>
				</div>
				<h1 style={{ textAlign: 'center', marginBottom: '25px' }}>
					Leave your feedback
				</h1>
				<form className='reviewForm' onSubmit={e => handleSumbit(e)}>
					<MyInput
						style={{ margin: '30px 40px' }}
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder='Description'
					></MyInput>
					<h3 style={{ textAlign: 'center' }}>Select rating</h3>
					<div className='ratingSelect'>
						<button
							onClick={e => handleRatingSet(1, e)}
							className='ratingButtonSelect'
						>
							1
						</button>
						<button
							onClick={e => handleRatingSet(2, e)}
							className='ratingButtonSelect'
						>
							2
						</button>
						<button
							onClick={e => handleRatingSet(3, e)}
							className='ratingButtonSelect'
						>
							3
						</button>
						<button
							onClick={e => handleRatingSet(4, e)}
							className='ratingButtonSelect'
						>
							4
						</button>
						<button
							onClick={e => handleRatingSet(5, e)}
							className='ratingButtonSelect'
						>
							5
						</button>
					</div>
					<div className='drag'>
						{drag ? (
							<div
								className='drop-area'
								onDragStart={e => dragStartHandler(e)}
								onDragLeave={e => dragLeaveHandler(e)}
								onDragOver={e => dragStartHandler(e)}
								onDrop={e => onDragHandler(e)}
							>
								Release the files to upload them
							</div>
						) : (
							<div
								className='drop-area-inactive'
								onDragStart={e => dragStartHandler(e)}
								onDragLeave={e => dragLeaveHandler(e)}
								onDragOver={e => dragStartHandler(e)}
							>
								Drag and drop files
							</div>
						)}
					</div>
					<MyButton
						type='submit'
						style={{ margin: '10px 130px' }}
						className='button-86'
					>
						Submit
					</MyButton>
					<h3 style={{textAlign: 'center'}}>{submitted && 'Submitted'}</h3>
				</form>
				<h1 style={{ textAlign: 'center', margin: '25px 0' }}>
					Customer Reviews
				</h1>
				<div className='reviews_display'>
					{reviews
						? reviews
								.slice(0, 9)
								.map(review => <ReviewCard review={review} key={review.id} />)
						: 'No reviews'}
				</div>
			</div>
		</div>
	)
}

export default SinglePage
