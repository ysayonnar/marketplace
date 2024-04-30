import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from './Header'
import ratingImage from '../static/star.png'
import ReviewCard from './ReviewCard'

function SinglePage() {
	const [product, setProduct] = useState({})
	const [reviews, setReviews] = useState([])
	const { id } = useParams()
	const [path, setPath] = useState('')
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
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
				<h1 style={{textAlign: 'center', marginBottom: '25px'}}>Customer Reviews</h1>
				<div className='reviews_display'>
					{reviews
						? reviews.map(review => (
								<ReviewCard review={review} key={review.id} />
						  ))
						: 'No reviews'}
				</div>

				{/* <form onSubmit={handleSumbit}>

				</form> */}
			</div>
		</div>
	)
}

export default SinglePage
