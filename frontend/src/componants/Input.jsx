import React from 'react';

const Input = ({ title, placeholder, type, onChange, value }) => {
	return (
		<div className='input'>
			<p className='input_title'>{title}</p>
			<input
				className='input_field'
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default Input;
