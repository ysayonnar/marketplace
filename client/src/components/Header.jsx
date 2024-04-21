import people from '../static/icons8-user-60.png'
import cart from '../static/icons8-cart-60.png'
import { useNavigate } from 'react-router-dom'

function Header() {
	const nav = useNavigate()

	return (
		<header className='header'>
			<h1
				style={{
					color: 'white',
					fontSize: '38px',
					margin: '30px 30px',
					width: '250px',
					userSelect: 'none'
				}}
				onClick={() => nav('/')}
			>
				Marketplace
			</h1>
			
			<div className='images_block'>
				<img src={people} className='ui_image' />
				<img src={cart} className='ui_image' />
			</div>
		</header>
	)
}

export default Header
