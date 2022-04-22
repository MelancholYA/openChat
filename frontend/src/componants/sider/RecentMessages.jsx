import React, { Suspense, useEffect, useMemo, useState } from 'react';
import useFetch from '../../utils/useFetch';
import Search from './Search';
import Spinner from '../shared/Spinner';

const RecentMessages = () => {
	const [isExpended, setIsExpended] = useState(false);
	const { getData, req } = useFetch();
	useEffect(() => {
		getData('http://localhost:8000/api/chat/history');
		return () => {};
	}, []);

	console.log(req);

	return (
		<Suspense fallback='loading...'>
			<div className={`sider_container${isExpended ? ' expended' : ''}`}>
				<div className='sider_container_header'>
					<h5>Recent Messages</h5>
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
				<Search placeholder='Search Messages' />
				{req.loading && (
					<div className='sider_container_spinner'>
						<Spinner height='50px' />
					</div>
				)}
				{req.error && (
					<div className='sider_container_error'>
						<h4>{req.error}</h4>
					</div>
				)}
				{req.res &&
					req.res.map((message) => (
						<div className='sider_container_message'></div>
					))}
			</div>
		</Suspense>
	);
};

export default RecentMessages;
