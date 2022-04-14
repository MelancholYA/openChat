import { useState } from 'react';

const Select = ({ title, onSelect, options }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState({ name: null, code: null });
	return (
		<div className='select'>
			<p className='select_title'>{title}</p>
			<p className='select_display' onClick={() => setIsOpen(!isOpen)}>
				{selected.name ?? 'Please select a country'}
			</p>
			<ul className={`select_menu ${isOpen ? 'opened' : ''}`}>
				{options.map((option) => (
					<li
						className={`select_option`}
						onClick={() => {
							onSelect(option.code);
							setIsOpen(false);
						}}>
						{option.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Select;
