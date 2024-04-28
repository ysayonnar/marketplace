import { useEffect, useState } from 'react'
import out from '../../static/sign-out.png'
import MyButton from '../MyButton/MyButton'
import MyInput from '../MyInput/MyInput'
import './UserWindow.css'
import axios from 'axios'

function UserWindow({active, setActive}){
    const [isLogined, setIsLogined] = useState(false)
    const [registerActive, setRegisterActive] = useState(false)
	const [loginActive, setLoginActive] = useState(false)
    const [registerInformator, setRegisterInformator] = useState('')
    const [regName, setRegName] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
	const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [loginInformator, setLoginInformator] = useState('')
	const [user, setUser] = useState({})

	const signOut = () => {
		localStorage.removeItem('authorization')
		setIsLogined(false)
		setUser({})
	}

	const auth = async() => {
		try {
			const response = await axios.get('http://localhost:3000/api/user/auth', {
				headers: {
					authorization: localStorage.getItem('authorization'),
				},
			})
			setUser(response.data.user)
		} catch (e) {
			console.log(e)
		}
	}

    const handleSubmitReg = async(e) => {
        e.preventDefault()
        if(!regEmail.includes('@')){
			return setRegisterInformator('Incorrect email')
		}
		if(regPassword.length < 7){
			return setRegisterInformator('Password is too short')
		}
		if(regName.length < 3 || regName.length > 15){
			return setRegisterInformator('Username must be from 4 to 15 symbols')
		}
		else{
			try {
				const response = await axios.post(
					'http://localhost:3000/api/user/registration',
					{email: regEmail, password: regPassword, username: regName}
				)
				setRegisterInformator(response.data.msg)
				if(response.data.token){
					localStorage.setItem('authorization', response.data.token)
					setIsLogined(true)
					auth()
				}
			} catch (e) {
				console.log(e);
			}
		}
		setRegEmail('')
		setRegName('')
		setRegPassword('')
    }

	const handleSubmitLog = async(e) => {
		e.preventDefault()
		if (!loginEmail.includes('@')) {
			return setLoginInformator('Incorrect email')
		}
		if (loginPassword.length < 7) {
			return setLoginInformator('Password is too short')
		}
		else{
			try {
				const response = await axios.post(
					'http://localhost:3000/api/user/login',{
						email: loginEmail, password: loginPassword
					}
				)
				setLoginInformator(response.data.msg)
				if(response.data.token){
					localStorage.setItem('authorization', response.data.token)
					setIsLogined(true)
					auth()
				}
			} catch (e) {
				console.log(e);
			}
		}
		setLoginEmail('')
		setLoginPassword('')
	}

    useEffect(() =>{
        const authorization = async() => {
			if (localStorage.getItem('authorization')) {
				setIsLogined(true)
				auth()
			} else {
				return setIsLogined(false)
			}
		}
		authorization()
    }, [])

    return (
			<div
				className={active ? 'modal active' : 'modal'}
				onClick={() => {
					setActive(false)
					setLoginActive(false)
					setRegisterActive(false)
					setRegisterInformator('')
					setLoginInformator('')
				}}
			>
				<div className='modal__content' onClick={e => e.stopPropagation()}>
					{!isLogined && !registerActive && !loginActive && (
						<div style={{ margin: '10px' }}>
							<h1 style={{ textAlign: 'center' }}>Ups! You are not logined.</h1>
							<div className='userButtons'>
								<MyButton
									className='button-62'
									onClick={() => setLoginActive(true)}
								>
									Sign In
								</MyButton>
								<MyButton
									className='button-62'
									onClick={() => setRegisterActive(true)}
								>
									Sign Up
								</MyButton>
							</div>
						</div>
					)}

					{loginActive && (
						<form onSubmit={e => handleSubmitLog(e)} className='loginForm'>
							<h1 style={{ margin: '15px 0', textAlign: 'center' }}>Login</h1>
							<div className='inputs_block'>
								<MyInput
									value={loginEmail}
									onChange={e => setLoginEmail(e.target.value)}
									placeholder='Email'
								/>
								<MyInput
									value={loginPassword}
									onChange={e => setLoginPassword(e.target.value)}
									placeholder='Password'
								/>
							</div>
							<MyButton
								type='submit'
								style={{ margin: '10px 170px' }}
								className='button-86'
							>
								Send
							</MyButton>
							<h3 className='informator'>{loginInformator}</h3>
						</form>
					)}

					{registerActive && (
						<form onSubmit={e => handleSubmitReg(e)} className='registerForm'>
							<h1 style={{ margin: '15px 0', textAlign: 'center' }}>
								Registration
							</h1>
							<div className='inputs_block'>
								<MyInput
									value={regName}
									onChange={e => setRegName(e.target.value)}
									placeholder='Username'
								/>
								<MyInput
									value={regEmail}
									onChange={e => setRegEmail(e.target.value)}
									placeholder='Email'
								/>
								<MyInput
									value={regPassword}
									onChange={e => setRegPassword(e.target.value)}
									placeholder='Password'
								/>
							</div>
							<MyButton type='submit' style={{ margin: '10px 170px' }} className='button-86'>
								Send
							</MyButton>
							<h3 className='informator'>{registerInformator}</h3>
						</form>
					)}

					{isLogined && !registerActive && !loginActive && (
						<div className='user__info'>
							<h1>You are Logined</h1>
							<h3 style={{ fontSize: '20px' }}>Email: {user.email}</h3>
							<h3 style={{ fontSize: '20px' }}>Username: {user.username}</h3>
							<MyButton
								onClick={signOut}
								style={{ marginTop: '15px', background: 'red', opacity: '0.9' }}
							>
								Sign out
							</MyButton>
						</div>
					)}
				</div>
			</div>
		)
}


export default UserWindow