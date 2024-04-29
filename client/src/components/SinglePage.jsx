import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from './Header'
import ratingImage from '../static/star.png'

function SinglePage() {
	const [product, setProduct] = useState({})
	const { id } = useParams()
	const [path, setPath] = useState('')
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const getProductById = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/api/product/one/${id}`
				)
				setProduct(response.data.product)
				setPath(`http://localhost:3000/${response.data.product.image_url}`)
				setLoaded(true)
			} catch (error) {
				console.log(error)
				setProduct({})
			}
		}

		getProductById()
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
						<h1 className='singlePageRating'>
							<img
								style={{ width: '26px', height: '26px', marginRight: '10px' }}
								src={ratingImage}
								alt=''
							/>
							Rating: {product.rating ? product.rating.toFixed(2) : 'No reviews'}
						</h1>
						<p className='singlePageDescription'>{product.description}</p>
                        <h1 className='singlePagePrice'>{product.price} BYN</h1>
                        <h3 className='singlePageOldPrice'>{Math.floor(product.price * 1.25)} BYN</h3>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SinglePage
