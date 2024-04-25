import { useEffect, useState } from 'react'
import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import './UserWindow.css'
import axios from 'axios'

function UserWindow({active, setActive}){
    const [isLogined, setIsLogined] = useState(false)
    const [registerActive, setRegisterActive] = useState(false)
    const [registerInformator, setRegisterInformator] = useState('')
    const [regName, setRegName] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [loginActive, setLoginActive] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = {regEmail, regName, regPassword}
        console.log(user);
    }

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
				onClick={() => {
					setActive(false)
					setLoginActive(false)
					setRegisterActive(false)
				}}
			>
				<div className='modal__content' onClick={e => e.stopPropagation()}>
					{!isLogined && !registerActive && !loginActive && (
						<div color='red'>
							<h1 style={{ textAlign: 'center' }}>Ups! You are not logined.</h1>
							<div className='userButtons'>
								<MyButton onClick={() => setLoginActive(true)}>
									Sign In
								</MyButton>
								<MyButton onClick={() => setRegisterActive(true)}>
									Sign Up
								</MyButton>
							</div>
						</div>
					)}

					{loginActive && <div className='loginForm'>login</div>}

					{registerActive && (
						<form onSubmit={e => handleSubmit(e)} className='registerForm'>
							<h1 style={{ margin: '15px 0', textAlign: 'center'}}>Registration</h1>
							<div className='inputs_block'>
								<MyInput value={regName} onChange={e => setRegName(e.target.value)} placeholder='Username' />
								<MyInput value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder='Email'/>
								<MyInput value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder='Password' />
							</div>
                            <MyButton type="submit" style={{margin: '10px 170px'}}>Send</MyButton>
                            <h3 className="informator">{registerInformator}</h3>
						</form>
					)}
				</div>
			</div>
		)
}


export default UserWindow