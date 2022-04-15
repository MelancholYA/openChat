import { useReducer, useState } from 'react';
import Input from '../componants/Input';
import Select from '../componants/Select';
import countries from '../assets/countries.json';

const Auth = () => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		country: '',
		password: '',
	});

	const submit = (e) => {
		e.preventDefault();
	};
	return (
		<div className='auth'>
			<div className='auth_side'></div>
			<div className='auth_main'>
				<h1 className='auth_main_title'>Welcome Back</h1>
				<form onSubmit={submit} className='auth_main_form'>
					<Input
						title='Full Name'
						value={userData.name}
						placeholder='Please enter your full name'
						type='text'
						onChange={(e) => setUserData({ ...userData, name: e })}
					/>
					<Input
						title='Email'
						value={userData.email}
						placeholder='Please enter your email'
						type='text'
						onChange={(e) => setUserData({ ...userData, email: e })}
					/>

					<Select
						options={countries}
						title='Country'
						onSelect={(e) => setUserData({ ...userData, country: e })}
					/>
					<Input
						title='Password'
						value={userData.password}
						type='pasword'
						onChange={(e) => setUserData({ ...userData, email: e })}
					/>
				</form>
			</div>
		</div>
	);
};
export default Auth;
