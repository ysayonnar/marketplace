import people from '../static/icons8-user-60.png'
import cart from '../static/icons8-cart-60.png'
import Search from '../UI/Search/Search'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Header({ searchValue, setSearchValue }) {
	const nav = useNavigate()
	const [isUserOpen, setIsUserOpen] = useState(false)
	const [isCartOpen, setIsCartOpen] = useState(false)

	return (
		<header className='header'>
			<h1
				style={{
					color: 'white',
					fontSize: '38px',
					margin: '30px 30px',
					width: '250px',
					userSelect: 'none',
					cursor: 'pointer',
				}}
				onClick={() => nav('/')}
			>
				Marketplace
			</h1>
			<Search
				value={searchValue}
				onChange={e => {
					setSearchValue(e.target.value)
				}}
				placeholder='Search...'
				style={{ margin: 'auto' }}
			/>
			<div className='images_block'>
				<img
					src={people}
					onClick={() => setIsUserOpen(!isUserOpen)}
					className='ui_image'
				/>
				<img
					src={cart}
					onClick={() => setIsCartOpen(!isCartOpen)}
					className='ui_image'
				/>
			</div>
			{isUserOpen && <h1></h1>}

			{isCartOpen && <h1></h1>}
		</header>
	)
}

export default Header
