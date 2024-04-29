import people from '../static/icons8-user-60.png'
import cart from '../static/icons8-cart-60.png'
import Search from '../UI/Search/Search'
import UserWindow from '../UI/UserWindow/UserWindow'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Header({ searchValue, setSearchValue, nosearch }) {
	const nav = useNavigate()
	const [isUserOpen, setIsUserOpen] = useState(false)
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [userModalActive, setUserModalActive] = useState(false)

	return (
		<>
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
				{!nosearch && (
					<Search
						value={searchValue}
						onChange={e => {
							setSearchValue(e.target.value)
						}}
						placeholder='Search...'
						style={{ margin: 'auto' }}
					/>
				)}
				<div className='images_block'>
					<img
						src={people}
						onClick={() => setUserModalActive(true)}
						className='ui_image'
					/>
					<img
						src={cart}
						onClick={() => setIsCartOpen(!isCartOpen)}
						className='ui_image'
					/>
				</div>
				
			</header>
			<UserWindow active={userModalActive} setActive={setUserModalActive} />
		</>
	)
}

export default Header
