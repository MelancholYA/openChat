import React, { useState } from 'react';
import Search from './Search';

const ActiveFriends = () => {
	const [isExpended, setIsExpended] = useState(false);
	return (
		<div className={`sider_container${isExpended ? ' expended' : ''}`}>
			<div className='sider_container_header'>
				<h5>Active Friends</h5>
				<svg
					className={isExpended ? 'rolled' : ''}
					onClick={() => setIsExpended(!isExpended)}
					xmlns='http://www.w3.org/2000/svg'
					width='15'
					fill='#ffffff'
					viewBox='0 0 320 512'>
					<path d='M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z' />
				</svg>
			</div>
			<Search placeholder='Search Friends' />
		</div>
	);
};

export default ActiveFriends;
