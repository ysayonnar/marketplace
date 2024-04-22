import axios from "axios"
import { useEffect, useState } from "react"
import ui from '../static/glass.png'

function ProductCard({product}){
    const [img, setImg] = useState(null )
    const [path, setPath] = useState(`http://localhost:3000/${product['image_url']}`)

    return (
			<div className='product_card'>
				<img className='product_image' src={path} alt='' />
				<h4
					style={{
						fontSize: '24px',
						margin: '5px 10px',
					}}
				>
					{product.title}
				</h4>
				<p
					style={{
						width: '220px',
						margin: '0 10px',
						fontSize: '14px',
						color: 'gray',
					}}
				>
					{product.description.slice(0, 25) + '...'}
				</p>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<h2
						style={{
							margin: '5px 10px',
							color: '#24c211',
							opacity: '0.7',
							fontSize: '22px',
						}}
					>
						{product.price} BYN
					</h2>
					<h2
						style={{
							margin: '6px 10px',
							color: 'gray',
							opacity: '0.7',
							fontSize: '20px',
                            textDecoration: 'line-through',
                            textDecorationThickness: '2px'
						}}
					>
						{Math.floor(product.price * 0.75)} BYN
					</h2>
				</div>
			</div>
		)
}

export default ProductCard