import rateImg from '../static/star.png'

function ReviewCard({review}){
    return (
			<div className='review_item'>
				<h2 className='rating'>
					Rating: {review.rating}
					<img
						style={{ width: '24px', height: '24px', marginLeft: '10px', paddingTop: '10px' }}
						src={rateImg}
						alt='No photo'
					/>
				</h2>
				<h2
					style={{ margin: '0 20px ', fontSize: '20px', fontWeight: '400' }}
				>
					{review.user.username}
				</h2>
				<p className='ratingTitle'>{review.title.slice(0, 30)}...</p>
				<img
					src={`http://localhost:3000/${review.image_url}`}
					alt='No photo'
					className='ratingImage'
				/>
			</div>
		)
}

export default ReviewCard