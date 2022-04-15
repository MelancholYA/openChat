import { useState } from 'react';

const Select = ({ title, onSelect, options }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState({ name: null, code: null });
	return (
		<div className='select'>
			<div className='select_title' onClick={() => setIsOpen(!isOpen)}>
				<p className={`select_title_placeholder ${selected.name ? 'up' : ''}`}>
					{title}
				</p>
				<p className='select_title_display'>{selected.name}</p>
			</div>

			<ul className={`select_menu ${isOpen ? 'opened' : ''}`}>
				{options.map((option) => (
					<li
						key={option.code}
						className={`select_menu_option`}
						onClick={() => {
							onSelect(option.code);
							setSelected({ name: option.name, code: option.code });
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
