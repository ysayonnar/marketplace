import { useEffect, useState } from 'react'
import MyButton from '../MyButton/MyButton'
import './UserWindow.css'

function UserWindow({active, setActive}){
    const [isLogined, setIsLogined] = useState(false)
    
    useEffect(() =>{
        if(!localStorage.getItem.authorization){
            setIsLogined(false)
        }
        else{
            setIsLogined(true)
        }
    }, [])

    return (
			<div
				className={active ? 'modal active' : 'modal'}
				onClick={() => setActive(false)}
			>
				<div className='modal__content' onClick={e => e.stopPropagation()}>
					{!isLogined && (
						<div color='red' style={{height: '200px'}}>
							<h1 style={{ textAlign: 'center' }}>Ups! You are not logined.</h1>
							<div className='userButtons'>
								<MyButton>Sign In</MyButton>
								<MyButton>Sign Up</MyButton>
							</div>
						</div>
					)}
				</div>
			</div>
		)
}


export default UserWindow