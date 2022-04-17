import { useState } from 'react';
import Input from '../componants/Input';
import Select from '../componants/Select';
import countries from '../assets/countries.json';
import axios from 'axios';
import loader from '../assets/loader.svg';

const Auth = () => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		country: '',
		password: '',
	});
	const [isLogin, setIsLogin] = useState(true);
	const [reqStatus, setReqStaus] = useState({ state: 0, message: null });

	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const submit = async (e) => {
		const url = isLogin
			? 'http://localhost:8000/api/auth'
			: 'http://localhost:8000/api/auth/new';
		e.preventDefault();
		if (!validateEmail(userData.email))
			return setReqStaus({ state: 2, message: 'Please enter a valid email' });
		setReqStaus({ state: 1, message: null });
		await axios
			.post(url, userData)
			.then((res) => {
				setReqStaus({ state: 0, message: null });
				localStorage.setItem('openchatToken', res.data.token);
				console.log(res);
			})
			.catch((err) => {
				const errorMessage = err.response
					? err.response.data.message
					: err.message;
				console.log();
				setReqStaus({ state: 2, message: errorMessage });
			});
	};
	return (
		<div className={`auth`}>
			<div className='auth_side'></div>
			<div className='auth_main'>
				<div className={`auth_main_title  ${isLogin ? '' : 'turn'}`}>
					<h1 className={`auth_main_title_front`}>Login</h1>
					<h1 className={`auth_main_title_bottom`}>Sign up</h1>
				</div>

				<form onSubmit={submit} className='auth_main_form'>
					{!isLogin && (
						<Input
							title='Full Name'
							value={userData.name}
							placeholder='Please enter your full name'
							type='text'
							onChange={(e) => setUserData({ ...userData, name: e })}
						/>
					)}

					<Input
						title='Email'
						value={userData.email}
						placeholder='Please enter your email'
						type='text'
						onChange={(e) => setUserData({ ...userData, email: e })}
					/>
					{!isLogin && (
						<Select
							options={countries}
							title='Country'
							onSelect={(e) => setUserData({ ...userData, country: e })}
						/>
					)}

					<Input
						title='Password'
						value={userData.password}
						type='password'
						onChange={(e) => setUserData({ ...userData, password: e })}
					/>
					<p
						className='auth_main_form_note'
						onClick={() => setIsLogin(!isLogin)}>
						{isLogin
							? "Don't have an account yet ? REGISTER"
							: 'Already have an account ? LOGIN'}
					</p>

					<button
						disabled={reqStatus.state === 1}
						className='auth_main_form_button'
						type='submit'>
						{reqStatus.state === 1 ? (
							<img height={20} src={loader} alt='spinner' />
						) : !isLogin ? (
							'Register'
						) : (
							'Login'
						)}
					</button>
				</form>
				{reqStatus.state === 2 && (
					<div className='auth_main_error'>{reqStatus.message}</div>
				)}
			</div>
		</div>
	);
};
export default Auth;
